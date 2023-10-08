//1. location
// const baseUrl = window.location.origin;
// console.log(location);
// document.addEventListener("click", () => {
//   // location.assign("https://google.com"); // assign New Document or Page
//   //   console.log(location.origin); // domian + protocol
//   //   location.pathname; // path name or end Point
//   //   location.protocol; // http or https
//   // location.reload()
//   //   location.replace("https://google.com");
// });

// if (!navigator.onLine) {
//   document.body.append("Lose Connection..!");
// } else {
//   document.body.append("Welcome Back");
// }
// =================>

// let counter = 0;
// const interval = 500;
// const x = setInterval(() => {
//   console.log(counter++);
// }, interval);

// document.addEventListener("click", () => {
//   clearInterval(x);
// });

// const x = setTimeout(() => {
//   console.log("Set Time Out");
// }, 3000);
// document.addEventListener("click", () => {
//   clearTimeout(x);
// });
// =======>
// window.addEventListener("blur", () => {
//   document.title = "Don't Forget Me..!";
// });
// window.addEventListener("focus", () => {
//   document.title = "DOM and BOM";
// });
// ===================>
// window Scroll
// const windowNavbar = document.querySelector(".windowNavbar");
// const toTop = document.querySelector(".toTop");
// console.log(windowNavbar);
// const handleChangeNavbar = (top, width, background) => {
//   windowNavbar.style.top = `${top}`;
//   windowNavbar.style.width = `${width}`;
//   windowNavbar.style.background = `${background}`;
// };
// const changeToTopIcon = (display) => {
//   toTop.style.display = `${display}`;
// };

// window.addEventListener("scroll", () => {
//   let windowScroll = window.scrollY;
//   if (windowScroll > 100) {
//     handleChangeNavbar("0", "100%", "teal");
//     changeToTopIcon("block");
//   } else {
//     handleChangeNavbar("1rem", "80%", "tomato");
//     changeToTopIcon("none");
//   }
// });

// toTop.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// });
// =====================>
const addTodo = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoInput");
const date = new Date();
const todoContainer = [];
let todoID = 1;

const saveDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getsaveDataToLocalStorage = (key) => {
  localStorage.getItem(key);
};

const displayTodoList = () => {
  let todoTemp = "";
  todoContainer.forEach((todo, index) => {
    todoTemp += `<tr data-id ="${todo.taskID}">
                <td>${todo.taskName}</td>
                <td><button class="btn btn-info btn-sm" onclick="edutTodo(${index})">Edit</button></td>
                <td><button class="btn btn-danger btn-sm " onclick="deletTodo(${index})">Delete</button></td>
                <td><span>${date.getDate()} Aug ,${date.getFullYear()}</span></td>
            </tr>`;
  });
  document.getElementById("showTodo").innerHTML = todoTemp;
};
const createTodoTask = () => {
  let todoTaskInfo = {
    taskID: todoID,
    taskName: todoInput.value,
  };
  todoID++;
  todoContainer.push(todoTaskInfo);

  console.log(todoContainer);
  saveDataToLocalStorage("todoListStorage", JSON.stringify(todoContainer));
  displayTodoList();
  //   Swal.fire("Good job!", `Task Name: ${todoTaskInfo.taskName}`, "success");
  clearInputs();
  console.log(todoContainer);
};
addTodo.addEventListener("click", createTodoTask);

const getDataFromStorage = () => {
  if (localStorage.getItem("todoListStorage")) {
    todoContainer.push(...JSON.parse(localStorage.getItem("todoListStorage")));
    displayTodoList();
  }
};
getDataFromStorage();

function clearInputs() {
  todoInput.value = "";
}
function deletTodo(index) {
  //   console.log(index.closest("tr").getAttribute("data-id"));
  console.log("Delete", index);
  //   let todoIndex = todoContainer.filter((todo, id) => todo[index] != todo.id);
  todoContainer.splice(index, 1);
  displayTodoList();
  saveDataToLocalStorage("todoListStorage", JSON.stringify(todoContainer));
  console.log(todoContainer);
}
function edutTodo(index) {
  // console.log("edit", index);
  // console.log(
  //   JSON.parse(localStorage.getItem("todoListStorage"))[index]["taskName"]
  // );

  const storedTasks = JSON.parse(localStorage.getItem("todoListStorage")) || [];
  const taskIdToEdit = index + 1;
  const taskToEdit = storedTasks.find((task) => task.taskID === taskIdToEdit);
  const btn = document.querySelector(`[data-id="${taskIdToEdit}"] button`);
  const btn1 = document.createElement("button");
  const td = document.querySelector(`[data-id="${taskIdToEdit}"] td`);
  const inpu = document.createElement("input");
  const btn2 = document.createElement("button");

  inpu.classList.add("clsinp");

  btn1.classList.add("btn1");
  btn.parentElement.appendChild(btn1);
  btn1.textContent = "ok";

  btn1.addEventListener("click", () => {
    btn.style.display = "inline-block";
    btn1.style.display = "none";
    btn2.style.display = "none";
    td.textContent = inpu.value;
    taskToEdit.taskName = inpu.value;
    localStorage.setItem("todoListStorage", JSON.stringify(storedTasks));
  });

  btn2.classList.add("btn2");
  btn.parentElement.appendChild(btn2);
  btn2.textContent = "cancel";
  btn.style.display = "none";

  btn2.addEventListener("click", () => {
    btn.style.display = "inline-block";
    btn1.style.display = "none";
    btn2.style.display = "none";
    td.textContent = curtext;
  });

  let curtext = td.textContent;
  td.textContent = "";

  td.appendChild(inpu);

  console.log(td);
  //taskToEdit.taskName = "New Task Name";
}
