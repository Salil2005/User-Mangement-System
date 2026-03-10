const http = require("http")
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")
const pool = require("./db")

const PORT = 3000

const server = http.createServer(async (req,res)=>{

/* ---------------- SERVE FRONTEND FILES ---------------- */

if(req.method==="GET"){

let filePath="./public"+(req.url==="/" ? "/index.html" : req.url)

const ext=path.extname(filePath)

const types={
".html":"text/html",
".css":"text/css",
".js":"application/javascript"
}

if(fs.existsSync(filePath)){

res.writeHead(200,{
"Content-Type":types[ext] || "text/plain"
})

fs.createReadStream(filePath).pipe(res)

return
}

}

/* ---------------- REGISTER USER ---------------- */

if(req.url==="/register" && req.method==="POST"){

let body=""

req.on("data",chunk=>{
body+=chunk
})

req.on("end",async()=>{

try{

const {name,email,password}=JSON.parse(body)

const hash=await bcrypt.hash(password,10)

await pool.query(
"INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
[name,email,hash]
)

res.writeHead(200)
res.end("Registered Successfully")

}catch(err){

console.log(err)

res.writeHead(400)
res.end("Registration Failed")

}

})

return
}

/* ---------------- LOGIN USER ---------------- */

if(req.url==="/login" && req.method==="POST"){

let body=""

req.on("data",chunk=>{
body+=chunk
})

req.on("end",async()=>{

try{

const {email,password}=JSON.parse(body)

const result=await pool.query(
"SELECT * FROM users WHERE email=$1",
[email]
)

if(result.rows.length===0){

res.writeHead(401)
res.end("User not found")
return
}

const user=result.rows[0]

const match=await bcrypt.compare(password,user.password)

if(!match){

res.writeHead(401)
res.end("Wrong password")
return
}

res.writeHead(200,{
"Content-Type":"application/json"
})

res.end(JSON.stringify({
name:user.name,
email:user.email,
role:user.role
}))

}catch(err){

console.log(err)

res.writeHead(500)
res.end("Login error")

}

})

return
}

/* ---------------- GET ALL USERS (ADMIN) ---------------- */

if(req.url==="/users" && req.method==="GET"){

try{

const result=await pool.query(
"SELECT id,name,email,created_at FROM users ORDER BY id ASC"
)

res.writeHead(200,{
"Content-Type":"application/json"
})

res.end(JSON.stringify(result.rows))

}catch(err){

console.log(err)

res.writeHead(500)
res.end("Error fetching users")

}

return
}

/* ---------------- GET USER DETAILS ---------------- */

if(req.url.startsWith("/user/") && req.method==="GET"){

try{

const id=req.url.split("/")[2]

const result=await pool.query(
"SELECT id,name,email,created_at FROM users WHERE id=$1",
[id]
)

res.writeHead(200,{
"Content-Type":"application/json"
})

res.end(JSON.stringify(result.rows[0]))

}catch(err){

console.log(err)

res.writeHead(500)
res.end("Error fetching user")

}

return
}

/* ---------------- DELETE USER ---------------- */

if(req.url.startsWith("/delete-user/") && req.method==="DELETE"){

try{

const id=req.url.split("/")[2]

await pool.query(
"DELETE FROM users WHERE id=$1",
[id]
)

res.writeHead(200)
res.end("User deleted")

}catch(err){

console.log(err)

res.writeHead(500)
res.end("Delete failed")

}

return
}

})

/* ---------------- START SERVER ---------------- */

server.listen(PORT,()=>{
console.log("Server running on http://localhost:"+PORT)
})