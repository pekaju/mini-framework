import { sm } from "./main.js";
import MF from "../../framework/dom.js";

export function destroyFn(sm, element) {
  const listItem = element.closest("li");
  const id = listItem.id;
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
          sm.setState(data.tasks)
      } else {r
        console.erro("Failed to delete task");
      }
    })
    .catch((error) => console.error("Error:", error));
  
}

export function updateCount() {
  const items = sm.getState();
  const strong = document.querySelector("strong");
  const count = document.getElementsByClassName("todo-count")[0];
  MF.deleteChildren(count);
  MF.append(count, strong);
  const itemsLeft = MF.create("span");
  itemsLeft.textContent = items.length === 1 ? " item left" : " items left";
  MF.append(count, itemsLeft);
  strong.textContent = items.length;
}

export async function handleClearCompletedClick(sm, element) {
  const states = sm.getState();
  const newStates = states.filter((state) => !state.completed);
  await fetch("http://localhost:3000/clearCompleted");
  sm.setState(newStates);
}

export function handleLiHover(sm, element) {
  const destroyElement = element.querySelector(".destroy");
  if (destroyElement) {
    destroyElement.className = "destroy";
  }
}

export async function handleSingleClick(sm, checkbox) {
  const id = checkbox.closest("li").id;
  if (id) {
    const response = await fetch("http://localhost:3000/checkSingleBox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const json = await response.json();
    sm.setState(json.tasks);
  }
}

export async function handleArrowClick(sm, element) {
  let states = sm.getState();
  let response;
  if (states.every((state) => state.completed)) {
    states = states.map((state) => ({ ...state, completed: false }));
    response = await fetch("http://localhost:3000/markAllNotCompleted");
  } else {
    states = states.map((state) => ({ ...state, completed: true }));
    response = await fetch("http://localhost:3000/markAllCompleted");
  }
  const json = await response.json();
  if (!json.success) {
    console.log("error marking all as complete in backend");
  }
  sm.setState(states);
}

export async function handleNewTodo(sm, newTodo) {
  if (newTodo !== "") {
    const todoItem = {
      description: newTodo,
      priority: "low",
      label: "work",
      completed: false,
    };
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    });
    const data = await response.json();
    if (data.success) {
      sm.setState(data.tasks);
    } else {
      console.log("error");
    }
  }
}

export function checkHides(sm) {
  const footer = document.getElementsByClassName("footer")[0];
  const main = document.getElementsByClassName("main")[0];
  if (sm.length == 0) {
    MF.setAttributes(footer, { class: "footer hide" });
    MF.setAttributes(main, { class: "main hide" });
  } else {
    MF.setAttributes(footer, { class: "footer" });
    MF.setAttributes(main, { class: "main" });
  }
}

export function changeToActive() {
  // Find the ul element with class "todo-list"
  const todoList = document.querySelector(".todo-list");

  if (todoList) {
    // Get all the li elements inside the ul
    const liElements = todoList.querySelectorAll("li");

    liElements.forEach((li) => {
      // Check if the li element contains the class "completed"
      if (li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, { class: "completed hide" });
      } else {
        MF.setAttributes(li, { class: "" });
      }
    });
  }
}

export function changeToCompleted() {
  // Find the ul element with class "todo-list"
  const todoList = document.querySelector(".todo-list");

  if (todoList) {
    // Get all the li elements inside the ul
    const liElements = todoList.querySelectorAll("li");

    liElements.forEach((li) => {
      // Check if the li element contains the class "completed"
      if (!li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, { class: "hide" });
      } else {
        MF.setAttributes(li, { class: "completed" });
      }
    });
  }
}

export function changeToList() {
  // Find the ul element with class "todo-list"
  const todoList = document.querySelector(".todo-list");

  if (todoList) {
    // Get all the li elements inside the ul
    const liElements = todoList.querySelectorAll("li");

    liElements.forEach((li) => {
      // Check if the li element contains the class "completed"
      if (li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, { class: "completed" });
      } else {
        MF.setAttributes(li, { class: "" });
      }
    });
  }
}
