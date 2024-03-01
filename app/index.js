import {
  toggleCourseDisplay,
  togglePeopleDisplay,
  createCourseCard,
  createUserCard,
} from "./helper.js";

// PAGE LOAD FUNCTIONS - >>>
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
async function loadCourses() {
  await fetch("http://localhost:3000/courses", {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      res.json().then((data) => {
        createCourseCard(data);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// FRONTEND LOADING - >>>>>
loadUsers();
loadCourses();
