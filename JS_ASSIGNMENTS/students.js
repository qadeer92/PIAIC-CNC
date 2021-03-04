var students = {
    "1": {
        "firstName": "Qadeer",
        "lastName": "Ahmed",
        "fullName": function() { return this.firstName + ' ' + this.lastName },
        "age": 40,
        "courses": ["HTML","CSS","JavaScript","REACT"],
        "isMale": true,                             //I can take is male or femal just want to use some javascript shortcut
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

var studentRec = () => {for(var key in students) {
    studentRec.push(students[key]);
}};
var courses = [];
var interests = [];
var iisMale = "Male"
const newStudent = document.getElementById("newStudent");
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
newStudent.addEventListener("click", function() {
    isExist = 0;
    if (firstName.value === "" || lastName.value === "" ) {
        alert("You must enter first and last name.")
    } else 
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

editStudent.addEventListener("click", function() {
    ValidateSelection("courses");
    ValidateSelection("interests");
    updateStudentObject(currentStudentId);
    updateStudentInTableRow(currentStudentId,"update");
})

delStudent.addEventListener("click", function() {
    let id = prompt("Enter the student ID");
    if (parseInt(id)) {        
            deleteStudent(parseInt(id));     
    }else {
        alert ("Wrong id!");
    }  
})

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

/*
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

function findStudent(id) {
    let student = students[id] ?? [];
    return student
}

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

function showStudent(student) {
    if (student !== null) {
        document.getElementById("ID").value = currentStudentId;
        document.getElementById("firstName").value = student.firstName;
        document.getElementById("lastName").value = student.lastName;
        document.getElementById("fullName").value = student.firstName + " " + student.lastName;
        document.getElementById("age").value = student.age;
        displaySelectedItems("courses", student.courses);
        (student.isMale === true) ? document.getElementsByName("isMale")[0].checked = true : document.getElementsByName("isMale")[1].checked = true
        displaySelectedItems("interests", student.interests);
    }
}


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
function objectMaxId() {
    let count = [];
    for (var c in students) {
        count.push(c);
    }
    maxId = Math.max(...count)
    return maxId;
}

function displaySelectedItems(checkitems,obj)  {  
    let arrCheckBoxes = []
    let checkboxes = document.getElementsByName(checkitems);
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = (obj.indexOf(checkboxes[i].value) >= 0) ?   true : false
    }
}  

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

function checkGender(sex) {
    let redios = document.getElementsByName(sex);
    
    for(var i = 0; i < redios.length; i++)  
    {  
        
        if(redios[i].checked)  {
            iisMale = redios[i].value
        }
    } 
  }

function displayGender(isM) {
    let redios = document.getElementsByName(sex);
    for(var i = 0; i < redios.length; i++)  
    {  
        if(redios[i].checked)  {
            iisMale = redios[i].value
        }
    } 
}


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


