
// curl -X 'POST' \
//   'http://microbloglite.us-east-2.elasticbeanstalk.com/api/users' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "username": "kevinelong",
//   "fullName": "Kevin Ernest Long",
//   "password": "S!mpl312"
// }'

function register() {
  return fetch(apiBaseURL + "/api/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
      },
      body: JSON.stringify({
          username: username.value,
          fullName: fullname.value,
          password: password.value
      })
  }).then(() => location = "/"); //TODO check for failure
}

registerButton.addEventListener("click", register)