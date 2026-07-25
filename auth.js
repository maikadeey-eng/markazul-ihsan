function login(username,password){

if(username==="admin" &&
password==="12345"){

localStorage.setItem(
"loggedIn",
"true"
);

return true;

}

return false;

}

function logout(){

localStorage.removeItem("loggedIn");

location.href="index.html";

}