const express = require('express')
const app = express()

// Hardcoded credentials (SonarQube issue)
const adminUser = "admin"
const adminPass = "admin123"

// Fake secret key (Gitleaks detection)
const AWS_SECRET_KEY = "AKIA999988887777SECRETKEY"

app.get("/", (req,res)=>{
    res.send(`
      <h1>VulnShop</h1>
      <p>DevSecOps Vulnerable Demo Application</p>
      <p>Try Login:</p>
      <p>/login?user=admin&pass=admin123</p>
    `)
})

app.get("/login", (req,res)=>{
    const user = req.query.user
    const pass = req.query.pass

    if(user == adminUser && pass == adminPass){
        res.send("Login Successful")
    } else {
        res.send("Login Failed")
    }
})

app.listen(3000, ()=>{
    console.log("VulnShop Running on port 3000")
})
