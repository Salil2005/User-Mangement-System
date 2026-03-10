async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const res=await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
})

if(res.status!==200){
alert("Invalid credentials")
return
}

const user=await res.json()

localStorage.setItem("user",JSON.stringify(user))

if(user.role==="admin"){
window.location.href="admin.html"
}
else{
window.location.href="dashboard.html"
}

}