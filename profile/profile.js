var settingsMenu = document.querySelector(".setting-menu");
var darkBtn = document.getElementById("dark-btn");

function settingsMenuToggle(){
  settingsMenu.classList.toggle("setting-menu-height");
}

darkBtn.onclick = function(){
  darkBtn.classList.toggle("dark-btn-on");
  document.body.classList.toggle("dark-theme");

if(localStorage.getItem("theme") == "light"){
  localStorage.setItem("theme", "dark")
}
else{
  localStorage.setItem("theme", "light")
}

}

if(localStorage.getItem("theme") == "light"){
  darkBtn.classList.remove("dark-btn-on");
  document.body.classList.remove("dark-theme");
} 
else if (localStorage.getItem("theme") == "dark"){
  darkBtn.classList.add("dark-btn-on");
  document.body.classList.add("dark-theme");
} 
else {
  localStorage.setItem("theme", "light");
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

fetch(apiBaseURL + "/api/users/" + localStorage.username, {
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
  bio.innerText = data.bio;
  bioText.innerText = data.bio;
});

bioText.addEventListener("keydown", e => {
  if (e.code != "Enter") {
      return 
  } 
  fetch(apiBaseURL + "/api/users/" + localStorage.username, {
      method: "PUT",
      mode: "cors", // cors, no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, 
      credentials: "same-origin",

      headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token
      },
      body: JSON.stringify({
          bio: bioText.value
      })
  }).then(response => {
      bioText.value = "";
      console.log(response);
      location = "/profile/";  //force refresh
  });
});


