//Student Object (nested) // I can store it into an array as well
var students = {
    "1": {
        "firstName": "Qadeer",
        "lastName": "Ahmed",
        "fullName": function() { return this.firstName + ' ' + this.lastName },
        "age": 40,
        "courses": ["HTML","CSS","JavaScript","REACT"],
        "isMale": true,                             //I can store male or female
        "interests":["Coding","Reading","Cricket"]        
    },
    "2": {
        "firstName": "Mohammad",
        "lastName": "Zeeshan",
        "fullName": function() { return this.firstName + ' ' + this.lastName },
        "age": 36,
        "courses": ["HTML","CSS","Java"],
        "isMale": true,
        "interests":["Reading","Cricket"]        
    },
    "3": {
        "firstName": "Shabana",
        "lastName": "Khan",
        "fullName": function() { return this.firstName + ' ' + this.lastName },
        "age": 24,
        "courses": ["HTML","JavaScript"],
        "isMale": false,
        "interests":["Coding", "Cooking","Movies"]        
    },
    "4": {
        "firstName": "Rizwan",
        "lastName": "Ansari",
        "fullName": function() { return this.firstName + ' ' + this.lastName },
        "age": 40,
        "courses": ["HTML","CSS","JavaScript","REACT"],
        "isMale": true,
        "interests":["Coding","Reading", "Cooking"]        
    }
}

//store in array for future enhancement
var studentRec = () => {for(var key in students) {  //arrow function used
    studentRec.push(students[key]);
}};

var courses = [];
var interests = [];
var iisMale = "Male"
const newStudent = document.getElementById("newStudent");   //html DOM
const editStudent = document.getElementById("editStudent");
const delStudent = document.getElementById("delStudent");
const searchStudent = document.getElementById("searchStudent");
const ID = document.getElementById("ID");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const fullName = firstName + " " + lastName;
const age = document.getElementById("age");
var isExist = 0;
var currentStudentId = 0 
var currentStudent = {}

//update / add single object
function updateStudentObject(id) {
    ValidateSelection("courses")
        ValidateSelection("interests")
        students[id] =  {
            firstName: firstName.value,
            lastName: lastName.value,
            fullName: fullName,
            age: age.value,
            courses:  courses,
            isMale: (iisMale ==="Male") ? true : false,
            interests: interests
            }
            currentStudent = students[id]
}

//Insert new student
newStudent.addEventListener("click", function() {
    isExist = 0;
    if (firstName.value === "" || lastName.value === "" ) {
        alert("You must enter first and last name.")
    } else 
        //student's full name must be unique
        searchProperty(students,firstName.value);
        searchProperty(students,lastName.value);
        if (isExist >= 2 ) {
            alert("Student already exist.")
        } else {
        let newId = objectMaxId()+1;
        ValidateSelection("courses")
        ValidateSelection("interests")
        updateStudentObject(newId)
        currentStudentId = newId
        currentStudent = students[newId]
        showStudent(students[newId]);
        addSutdentRow(students[newId])
        }    
    })

//Edit button to edit an existing student
editStudent.addEventListener("click", function() {
    ValidateSelection("courses");
    ValidateSelection("interests");
    updateStudentObject(currentStudentId);
    updateStudentInTableRow(currentStudentId,"update");
})

//delete button to delete a student
delStudent.addEventListener("click", function() {
    let id = prompt("Enter the student ID");
    if (parseInt(id)) {        
            deleteStudent(parseInt(id));     
    }else {
        alert ("Wrong id!");
    }  
})

//Search button to find a student
searchStudent.addEventListener("click", function() {
    let id = prompt("Enter the student ID");
    if (parseInt(id)) {
        let student = findStudent(parseInt(id));
        if (student.length == 0) {
            alert("Not found!")}
        else {
            currentStudentId = id;
            showStudent(student);   
        }
    }else {
        alert ("Wrong id!");
    }  
})

/*update a single property of an object (nasted)
function updateStudentProp(id,prop,value) {
    if (id === "") {
        delete students[id][prop];
    } else if (!students[id].hasOwnProperty(prop)) {
        return undefined
    }
    else if (prop = "courses") {
        students[id][prop] = students[id][prop] || [];
        students[id][prop] = value;
    } else if (prop = "fullName") {
        return undefined
    } else {
        students[id][prop] = value;
    }
    return students
} */

//return a student object for the given id
function findStudent(id) {
    let student = students[id] ?? []; //ES2020 Nullish coalescing operator used (A nullish value is a value that is either null or undefined)
    return student
}

//delete functionality
function deleteStudent(id) {
    let student = findStudent(id);
    if (student.length === 0) {
        alert("Not found")
    }
    else {
        let answer = prompt("Do you really want to delete this record? Y/N");
        if (answer = "Y") {
            delete students[id];
            if (document.getElementById("ID").value == id &&  objectCount(students) > 1 ) {
                currentStudentId = 1;
            }
            let student = findStudent(currentStudentId);
            showStudent(student)
            updateStudentInTableRow(id,"delete");
            return "Record deleted";
        }
    }
}

//store object properties into html DOM elements
function showStudent(student) {
    if (student !== null) {
        document.getElementById("ID").value = currentStudentId;
        document.getElementById("firstName").value = student.firstName;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("fullName").value = student.firstName + " " + student.lastName;
        document.getElementById("age").value = student.age;
        displaySelectedItems("courses", student.courses);
        //ternary operator used
        (student.isMale === true) ? document.getElementsByName("isMale")[0].checked = true : document.getElementsByName("isMale")[1].checked = true
        displaySelectedItems("interests", student.interests);
    }
}

//insert one row into html DOM table element
function addSutdentRow(student) {
    if (student === null) {
        alert ("Student object is null");
    } else {
        let table = document.getElementById("studentList");
        let tbody = document.getElementById("tbody");
        let row = table.insertRow(-1)
        let newCell = row.insertCell(-1).innerHTML =  objectMaxId();
        newCell = row.insertCell(-1).innerHTML = firstName.value;
        newCell = row.insertCell(-1).innerHTML = lastName.value;
        newCell = row.insertCell(-1).innerHTML = firstName.value + " " + lastName.value;
        newCell = row.insertCell(-1).innerHTML = age.value;
        newCell = row.insertCell(-1).innerHTML = courses;
        newCell = row.insertCell(-1).innerHTML = iisMale;
        newCell = row.insertCell(-1).innerHTML = interests;
    }
}

//insert all students into rows of html DOM table
function showStudents(obj, objName) {
    let tableElementContainer1 = document.createElement("div") 
    let temptableHolder  = "<table id = 'studentList' style='border: 1px solid black'><thead><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Full Name</th><th>Age</th><th>Courses</th><th>IsMale</th><th>Hobbies</th></tr></thead><tbody id = 'tbody'>";

    let result = "";
    let icount = 0
    for (var i in obj) {
        icount += 1
        if (icount ===1) {currentStudentId = i; showStudent(obj[i])} 
        temptableHolder  += "<tr'>"
        temptableHolder  += "<td>" + i + "</td>"
        for (var j in obj[i]) {
            if (obj[i].hasOwnProperty(j)) {
                if  (typeof obj[i][j] == 'function') {
                    result += `${objName}.${i}.${j} = ${obj[i][j]()}\n`;;
                    temptableHolder  += "<td>" + obj[i][j]() + "</td>";
                } else if (j == "isMale") {
                    result += `${objName}.${i}.${j} = ${obj[i][j]}\n`;
                    temptableHolder  += "<td>" + (obj[i][j] === true ? "Male" : "Female")  + "</td>";
                } else {
                    result += `${objName}.${i}.${j} = ${obj[i][j]}\n`;
                    temptableHolder  += "<td>" + obj[i][j] + "</td>";
                }
            } else {
                undefined;
            }
        }
        temptableHolder  += "</tr>";
    }
    temptableHolder += "</tbody></table>";
    tableElementContainer1.innerHTML  = temptableHolder ;
    document.body.appendChild(tableElementContainer1)
    return result;
}

//update single row into html DOM table element
function updateStudentInTableRow(id, action ) {
    let table = document.getElementById("studentList");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (row.cells[0].innerHTML == id && action == "update") {
                //updateStudentProp(row.cells[1],"firstName",students[id].firstName)
                row.cells[1].innerHTML = students[id].firstName
                row.cells[2].innerHTML = students[id].lastName
                row.cells[3].innerHTML = students[id].firstName + " " +  students[id].lastName
                row.cells[4].innerHTML = students[id].age
                row.cells[5].innerHTML = students[id].courses
                row.cells[6].innerHTML = (students[id].isMale) ? "Male" : "Female"
                row.cells[7].innerHTML = students[id].interests
                return
            } else if (row.cells[0].innerHTML == id && action == "delete") {
                table.deleteRow(i)
                return
            //} else {
            //    console.log(row.cells[0].innerHTML + " " + action + " " + id + "Wrong Action!");
            }
        }  
    }
}

//************support functions********************
//max id of student
function objectMaxId() {
    let count = [];
    for (var c in students) {
        count.push(c);
    }
    maxId = Math.max(...count) //ES6 spread operator used
    return maxId;
}

//checked only selected courses or hobbies
function displaySelectedItems(checkitems,obj)  {  
    let arrCheckBoxes = []
    let checkboxes = document.getElementsByName(checkitems);
    for (var i = 0; i < checkboxes.length; i++) {
        //ternary operator used
        checkboxes[i].checked = (obj.indexOf(checkboxes[i].value) >= 0) ?   true : false
    }
}  

//save selected courses or hobbies into array
function ValidateSelection(checkitems)  
{  
    let checkboxes = document.getElementsByName(checkitems);  
    let numberOfCheckedItems = 0;
    if (checkitems === "courses"  ) {courses = [];}
    if (checkitems === "interests" ) {interests = [];}
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  {
            numberOfCheckedItems++;
            if (checkboxes[i].name === "courses" ) {courses.push(checkboxes[i].value);}
            if (checkboxes[i].name === "interests" ) {interests.push(checkboxes[i].value);}
        }
    }  
    if(numberOfCheckedItems < 1)  
    {  
        alert("You must Selecct atleast one " + checkitems[name]);  
        return false;  
    }  
}  

//iterate a nasted object to search single property of an student object
function searchProperty (obj, query) {
    for (var key in obj) {
        var value = obj[key];

        if (typeof value === 'object') {
            searchProperty(value, query);
        }

        if (value === query) {
            isExist += 1;
            //console.log( 'property=' + key + ' value=' + value);
        }
    }
}

//total student's objects count into students object
function objectCount (obj) {
    let objCount = 0
    for (var key in obj) {
        var value = obj[key];

        if (typeof value === 'object') {
            objCount += 1
        }

    }
    return objCount
}
//************support functions********************


//console.log(updateStudentProp("1","age",25));
//console.log(showStudents(students,"Student"));
//console.log(findStudent(1));
//console.log(deleteStudent(9));


