async function adminLogin(){

 const email=document.getElementById("email").value
 const password=document.getElementById("password").value

 const res=await fetch("/login",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({email,password})
 })

 if(res.status!==200){
  alert("Login failed")
  return
 }

 const user=await res.json()

 if(user.role!=="admin"){
  alert("Not an admin account")
  return
 }

 localStorage.setItem("user",JSON.stringify(user))

 window.location.href="admin.html"

}