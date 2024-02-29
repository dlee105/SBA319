const userDisplayEl = document.getElementById("USER_DISPLAY");

async function loadUsers() {
  await fetch("http://localhost:3000/users", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      console.log(res);
      res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

loadUsers();
