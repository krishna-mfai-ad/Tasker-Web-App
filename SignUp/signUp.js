document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    recordsSaving();
});

function recordsSaving() {
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userRecords = JSON.parse(localStorage.getItem("users")) || [];
    if (userRecords.some((v) => v.email == email)) {
        alert("Email already exists");
    } else {
        userRecords.push({
            "name": name,
            "email": email,
            "password": password
        });
        localStorage.setItem("users", JSON.stringify(userRecords));
        window.location.assign("./login.html");
    }
}
