if(

window.location.pathname.includes("dashboard.html")

){

if(localStorage.getItem("loggedIn")!=="true"){

window.location.href="index.html";

}

}
const form = document.getElementById("studentForm");

if(form){

form.addEventListener("submit", function(event){

event.preventDefault();

const student = {

studentId: document.getElementById("studentId").value,

fullName: document.getElementById("fullName").value,

address: document.getElementById("address").value,

studentClass: document.getElementById("studentClass").value,

parentName: document.getElementById("parentName").value,

parentPhone: document.getElementById("parentPhone").value,

admissionDate: document.getElementById("admissionDate").value

};

let students = JSON.parse(localStorage.getItem("students")) || [];

students.push(student);

localStorage.setItem("students", JSON.stringify(students));

alert("Student Saved Successfully!");

form.reset();

});

}

const tableBody = document.querySelector("#studentTable tbody");

if(tableBody){

let students = JSON.parse(localStorage.getItem("students")) || [];

students.forEach(function(student,index){

tableBody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${student.studentId}</td>

<td>${student.fullName}</td>

<td>${student.studentClass}</td>

<td>${student.parentPhone}</td>

<td>
<td>
<button onclick="editStudent(${index})">
Edit
</button>

<button class="delete-btn" onclick="deleteStudent(${index})">
Delete
</button>
</td>
</button>
</td>

</tr>

`;

});

}
function deleteStudent(index){

let students = JSON.parse(localStorage.getItem("students")) || [];

if(confirm("Are you sure you want to delete this student?")){

students.splice(index,1);

localStorage.setItem("students", JSON.stringify(students));

location.reload();

}

}

function editStudent(index){

let students = JSON.parse(localStorage.getItem("students")) || [];

let student = students[index];

document.getElementById("studentId").value = student.studentId;
document.getElementById("fullName").value = student.fullName;
document.getElementById("address").value = student.address;
document.getElementById("studentClass").value = student.studentClass;
document.getElementById("parentName").value = student.parentName;
document.getElementById("parentPhone").value = student.parentPhone;
document.getElementById("admissionDate").value = student.admissionDate;

students.splice(index,1);

localStorage.setItem("students", JSON.stringify(students));

window.location.href="add-student.html";

}
const totalStudents = document.getElementById("totalStudents");

if(totalStudents){

let students = JSON.parse(localStorage.getItem("students")) || [];

totalStudents.textContent = students.length;

}
const search = document.getElementById("search");

if(search){

search.addEventListener("keyup", function(){

const value = search.value.toLowerCase();

const rows = document.querySelectorAll("#studentTable tbody tr");

rows.forEach(function(row){

const name = row.cells[2].textContent.toLowerCase();

if(name.includes(value)){

row.style.display="";

}else{

row.style.display="none";

}

});

});

}
function updateClock(){

const now = new Date();

document.getElementById("clock").textContent =
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();
const greeting = document.getElementById("greeting");

if(greeting){

const hour = new Date().getHours();

if(hour < 12){

greeting.textContent = "Good Morning ☀";

}else if(hour < 18){

greeting.textContent = "Good Afternoon 🌤";

}else{

greeting.textContent = "Good Evening 🌙";

}

}
const photo = document.getElementById("studentPhoto");

if(photo){

photo.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(){

document.getElementById("preview").src =
reader.result;

};

reader.readAsDataURL(file);

}

});

}
function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

if(username==="admin" && password==="12345"){

localStorage.setItem("loggedIn","true");

window.location.href="dashboard.html";

}else{

alert("Invalid Username or Password");

}

}
function logout(){

localStorage.removeItem("loggedIn");

window.location.href="index.html";

}
const todayAdmissions =
document.getElementById("todayAdmissions");

if(todayAdmissions){

const students =
JSON.parse(localStorage.getItem("students")) || [];

const today =
new Date().toISOString().split("T")[0];

let count = 0;

students.forEach(student=>{

if(student.admissionDate===today){

count++;

}

});

todayAdmissions.textContent = count;

}