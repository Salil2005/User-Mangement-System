async function register(){

const name=document.getElementById("name").value
const email=document.getElementById("email").value
const password=document.getElementById("password").value
const confirm=document.getElementById("confirmPassword").value

if(password!==confirm){
alert("Passwords do not match")
return
}

const res=await fetch("/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password})
})

const msg=await res.text()

alert(msg)

if(res.status===200){
window.location.href="login.html"
}

}