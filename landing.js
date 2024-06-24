/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#sign-in-form");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    // loginForm.loginButton.disabled = true;
    // loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};


function register() {
    return fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            username: registerUsername.value,
            fullName: registerFullName.value,
            password: registerPassword.value
        })
    })// .then(() => location = "/"); //TODO check for failure
  }
  
  registerButton.addEventListener("click", register)