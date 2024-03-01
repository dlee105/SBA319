const userDisplayEl = document.getElementById("USER_DISPLAY");
const courseDisplayEl = document.getElementById("COURSE_DISPLAY");

export function createUserCard(usersArr) {
  for (let user of usersArr) {
    let userRow = document.createElement("div");
    if (user.userType == "teacher") userRow.classList.add("bg-success-subtle");
    else if (user.userType == "student")
      userRow.classList.add("bg-primary-subtle");
    userRow.classList.add(
      "text-dark",
      "row",
      "p-3",
      "mb-2",
      "bg-gradient",
      "rounded-3",
      "me-3"
    );
    userRow.style.maxWidth = "21vw";
    userRow.style.minWidth = "21vw";

    // userRow.style.minWidth = "25vw";
    // userRow.setAttribute("id", user._id);
    userRow.innerHTML = `
      <div class=" text-center">
        <h2>${user.firstName} ${user.lastName}</h2>
        <div>Username: ${user.username}</div>
        <div>Email: ${user.email}</div> 
      </div>
      <div class="d-flex justify-content-center mb-2" id="${user._id}">
        <button type="button" class="btn btn-primary" value="edit">Edit</button>
        <button type="button" class="btn btn-danger ms-1" value="remove">Remove</button>
      </div>
      `;
    userDisplayEl.appendChild(userRow);
  }
}

export function createCourseCard(courseArr) {
  for (let course of courseArr) {
    let courseRow = document.createElement("div");
    let courseHeader = document.createElement("div");
    courseHeader.classList.add(
      "text-center",
      "text-light",
      "bg-dark",
      "m-0",
      "d-flex",
      "flex-column",
      "py-2"
    );
    findUserByID(course.instructor).then((res) => {
      courseHeader.innerHTML = `<h3>${course.courseName}</h3>
                                <h4>Instructor: ${res.firstName} ${res.lastName}</h4>
                                <p class="fst-italic">${course.description}</p>`;
    });
    courseRow.setAttribute("id", course._id);
    courseRow.classList.add("mb-3", "border", "bg-warning-subtle");
    courseRow.appendChild(courseHeader);
    let thisCourseStudents = document.createElement("div");
    thisCourseStudents.classList.add(
      "d-flex",
      "mb-3",
      "bg-light",
      "pt-3",
      "ps-3",
      "pe-3",
      "mx-3",
      "d-flex",
      "flex-wrap"
    );
    let studentHeader = document.createElement("h5");
    studentHeader.classList.add("px-3", "py-2");
    studentHeader.innerText = "List of students:";
    courseRow.appendChild(studentHeader);
    for (let student of course.student) {
      findUserByID(student).then((res) => {
        let studentBox = document.createElement("div");
        studentBox.classList.add("p-2", "bg-primary-subtle", "me-2", "mb-3");
        studentBox.style.minWidth = "125px";
        studentBox.innerText = `${res.firstName + " " + res.lastName}`;
        thisCourseStudents.appendChild(studentBox);
      });
    }
    courseRow.appendChild(thisCourseStudents);

    courseDisplayEl.appendChild(courseRow);
  }
}

export function togglePeopleDisplay() {
  const peopleDisplay = document.getElementById("people-form");
  if ([...peopleDisplay.classList].includes("people-form")) {
    peopleDisplay.classList.remove("people-form");
  } else {
    peopleDisplay.classList.add("people-form");
  }
}

export function toggleCourseDisplay() {
  const coursesDisplay = document.getElementById("courses-form");
  if ([...coursesDisplay.classList].includes("courses-form")) {
    coursesDisplay.classList.remove("courses-form");
  } else {
    coursesDisplay.classList.add("courses-form");
  }
}

async function findUserByID(id) {
  // return a promise object use additional then((res) => res)
  let res = await fetch(`http://localhost:3000/users/${id}`, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  let data = await res.json();
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

window.addEventListener("click", (e) => {
  if (e.target.value === "remove") {
    console.log("removing", e.target.parentNode.id);
  } else if (e.target.value === "edit") {
    console.log("editing", e.target.parentNode.id);
  } else if (["pdrop1", "pdrop2"].includes(e.target.id)) {
    // console.log("p-arrow");
    togglePeopleDisplay();
  } else if (["cdrop1", "cdrop2"].includes(e.target.id)) {
    toggleCourseDisplay();
  }
});
