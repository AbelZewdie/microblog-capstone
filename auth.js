/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// const apiBaseURL = "https://microbloglite.herokuapp.com";
// Backup server:   https://microbloglite.onrender.com

// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.



// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
    return Boolean(localStorage.token);
}


// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
function login(loginData) {
    return fetch(apiBaseURL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(loginData),
    }).then(response => response.json()).then(loginData => {
        if (loginData.hasOwnProperty("message")) {
            errorMessage.innerHTML = loginData.statusCode + " - " + loginData.message;
            return;
        }
        errorMessage.innerHTML = "";
        window.localStorage.setItem("login-data", JSON.stringify(loginData));
        window.localStorage.token = loginData.token; //simple string
        window.localStorage.username = loginData.username; //simple string
        window.location.assign("/posts");  // redirect
        return loginData;
    });
}


function logout() {
    fetch(apiBaseURL + "/auth/logout", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.token}` }
    }).then(() => {
        window.localStorage.removeItem("token");
        location = "/";  // redirect back to landing page
    });
}