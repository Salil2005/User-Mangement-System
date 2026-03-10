const user = JSON.parse(localStorage.getItem("user"))

if(!user){
 window.location.href="login.html"
}

document.getElementById("welcome").innerText =
"Welcome, "+user.name

document.getElementById("name").innerText =
user.name

document.getElementById("email").innerText =
user.email

document.getElementById("role").innerText =
user.role

function logout(){

 localStorage.removeItem("user")

 window.location.href="index.html"

}