/* Posts Page JavaScript */

"use strict";
// curl -X 'POST' \
//   'http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts' \
//   -H 'accept: application/json' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluZWxvbmciLCJpYXQiOjE3MTg5OTA5MTgsImV4cCI6MTcxOTA3NzMxOH0.Kk6YxYzdAaagLSu0az1Jfz7nQ3k23ayIdW3vnpNbwIo' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "text": "string"
// }'
messageElement.addEventListener("keydown", e => {
    if (e.code != "Enter") {
        return 
    } 
    fetch(apiBaseURL + "/api/posts", {
        method: "POST",
        mode: "cors", // cors, no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, 
        credentials: "same-origin",

        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token
        },
        body: JSON.stringify({
            text: messageElement.value
        })
    }).then(response => {
        messageElement.value = "";
        console.log(response);
        location = "/posts/";  //force refresh
    });
});




function getMessage(message) {
    const d = new Date(message.createdAt)
    return `
    <div class="post-container">
        <div class="post-row">
          <div class="user-profile">
            <img src="images/greyman.png" alt="">
            <div>
              <p>${message.username}</p>
              <span>${d.toLocaleDateString()}</span>
              <span>${d.toLocaleTimeString()}</span>
              <span>id: ${message._id.slice(-5)}</span>

            </div>
          </div>
          <a href="#"><i class="fa-solid fa-ellipsis-vertical"></i></a>
        </div>

        <p class="post-text">${message.text}</p>

        <!-- ----------------------Like ICONS | #1 Post---------------------- -->
        <div class="post-row">
          <div class="activity-icons">
            <div><img src="images/like-blue.png" onclick="like('${message._id}')" alt="">${message.likes.length}</div>
            <div><img src="images/comments.png" alt=""> 0</div>
            <div><img src="images/share.png" alt=""> 0</div>
          </div>
          <div class="post-profile-icon">
            <img src="images/profile-pic-abel.png" alt=""><i class="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
    
    `;
}

function like(id) {
    console.log(id);

    fetch(apiBaseURL + "/api/likes", {
        method: "POST",
        // mode: "no-cors", // cors, no-cors, *cors, same-origin
        // credentials: "omit", // include, *same-origin, omit

        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },

        body: JSON.stringify({
            "postId": id
        })
    }).then(r => location = location);
}

function showMessages(messages) {
    if (messages.hasOwnProperty("message")) {
        location = "/";
        return;
    }
    messagesOutput.innerHTML = messages.map(getMessage).join("");
}

fetch(apiBaseURL + "/api/posts", {
    method: "GET",
    // mode: "no-cors", // cors, no-cors, *cors, same-origin
    // credentials: "omit", // include, *same-origin, omit
    headers: { Authorization: `Bearer ${localStorage.token}` }
}).then(response => {
    if (response.statusCode >= 400) {
        console.log(response);
        location = "/";
    }
    return response.json()
}).then(data => {
    showMessages(data);
});


////////////////////////////////////////////////////

var settingsMenu = document.querySelector(".setting-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle() {
    settingsMenu.classList.toggle("setting-menu-height");
}

darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme");

    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark")
    }
    else {
        localStorage.setItem("theme", "light")
    }

}

if (localStorage.getItem("theme") == "light") {
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if (localStorage.getItem("theme") == "dark") {
    darkBtn.classList.add("dark-btn-on");
    document.body.classList.add("dark-theme");
}
else {
    localStorage.setItem("theme", "light");
}

