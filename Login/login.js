// var mail = document.getElementById("emailID")
// var pass = document.getElementById("password")

// var emailStatus = document.getElementById("emailStatus")
// var passStatus = document.getElementById("passStatus")

function signing() {
    let email, password;
    email = document.getElementById("emailID").value;
    password = document.getElementById("password").value;

    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem("users")) || []
    if (userRecords.some((v) => {
        return v.email == email && v.password == password
    })) {
        window.location.assign("http://127.0.0.1:5500/Home/home.html");
    }
    else {
        alert("Email or Password is not matching");
    }
}