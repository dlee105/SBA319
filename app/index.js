const userDisplayEl = document.getElementById("USER_DISPLAY");

function createUserCard(usersArr) {
  for (let user of usersArr) {
    let userRow = document.createElement("div");
    userRow.classList.add(
      "row",
      "d-flex",
      "bg-dark",
      "p-3",
      "mb-2",
      "text-light",
      "bg-gradient",
      "rounded-3"
    );
    userRow.setAttribute("id", user._id);
    userRow.innerHTML = `
    <div class="mb-3 text-center">
      <h2>${user.firstName} ${user.lastName}</h2>
      <div>Username: ${user.username}</div>
      <div>Email: ${user.email}</div> 
    </div>
    <div class="d-flex justify-content-center mb-2">
      <button type="button" class="btn btn-primary">Edit</button>
      <button type="button" class="btn btn-danger ms-1">Remove</button>
    </div>
    `;
    userDisplayEl.appendChild(userRow);
  }
}

async function loadUsers() {
  await fetch("http://localhost:3000/users", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      res.json().then((data) => {
        createUserCard(data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

loadUsers();
