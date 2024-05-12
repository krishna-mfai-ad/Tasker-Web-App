var email=document.getElementById("emailID")
var pass=document.getElementById("password")

var emailStatus=document.getElementById("emailStatus")
var passStatus=document.getElementById("passStatus")
function signing(){
    let index="http://127.0.0.1:5500/Home/home.html"
    if(email.value=="krishna@mfedu.com" && pass.value=="12345678"){
        window.location.assign(index)
    }
    else{
        console.log("Else")
        if(email.value!="krishna@mfedu.com"){
            emailStatus.innerText="Incorrect Mail"
            emailStatus.style="color:red; text-align:end;"
        }
        else{
            emailStatus.innerText="Mail Accepted"
            emailStatus.style="color:green; text-align:end;"
        }
        if(pass.value!="12345678"){
            passStatus.textContent="Incorrect Password"
            passStatus.style="color:red; text-align:end"
        }
        else{
            passStatus.style="color:green; text-align:end;"
            passStatus.innerText="Password Accepted"
        }
    }
}