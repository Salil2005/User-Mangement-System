async function loadUsers(){

 const res=await fetch("/users")

 const users=await res.json()

 const table=document.getElementById("usersTable")

 users.forEach(user=>{

  const row=table.insertRow()

  row.insertCell(0).innerText=user.id
  row.insertCell(1).innerText=user.name
  row.insertCell(2).innerText=user.email

  const actions=row.insertCell(3)

  actions.innerHTML=
  `
  <button onclick="viewUser(${user.id})">View</button>
  <button onclick="deleteUser(${user.id})">Delete</button>
  `

 })

}

async function viewUser(id){

 const res=await fetch("/user/"+id)

 const user=await res.json()

 alert(
  "Name: "+user.name+
  "\nEmail: "+user.email+
  "\nRegistered: "+user.created_at
 )

}

async function deleteUser(id){

 if(!confirm("Delete user?")) return

 await fetch("/delete-user/"+id,{
 method:"DELETE"
 })

 location.reload()

}

function logout(){

 localStorage.removeItem("user")

 window.location.href="index.html"

}

loadUsers()