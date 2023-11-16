// Import your mini framework
import MF from "../../framework/dom.js";
import StateManager from "../../framework/state.js";
import Router from "../../framework/router.js";
import {
  addEnterKeyListener,
  addClickListener,
} from "../../framework/events.js";
import { appContainer, info } from "./todo.js";
import { createToDoList } from "./todoList.js";
import { checkHides, getCorrectCheckboxes, handleArrowClick, updateCount, handleClearCompletedClick } from "./functions.js";
import { changeToActive, changeToList, changeToCompleted } from "./functions.js"

const landingPage = window.location.hash;
let initialStateLanding = ""
if (landingPage == "/" || landingPage == "#/" || landingPage == "") {
  initialStateLanding = "All"
}else if (landingPage == "#/completed") {
  initialStateLanding = "Completed"
}else if(landingPage == "#/active") {
  initialStateLanding == "Active"
}

export const url = new StateManager(initialStateLanding)
export const sm = new StateManager([]);
sm.subscribe(createToDoList);
sm.subscribe(checkHides);
sm.subscribe(getCorrectCheckboxes);

Router.register("#/", changeToList);

Router.register("#/active", changeToActive);

Router.register("#/completed", changeToCompleted);


Router.init(url);

// Append the main container to the document body
const root = document.getElementById("root");
const infoSection = info();
const appContainerSection = appContainer();
MF.append(root, appContainerSection);
MF.append(root, infoSection);


sm.subscribe(updateCount);

addEnterKeyListener(document.getElementById('todo-input'), sm, (newTodo, sm) => {
  if (newTodo !== "") {
    const currentTodos = sm.getState();
    const todoItem = { description: newTodo, completed: false };
    sm.setState([...currentTodos, todoItem]);
    const urlState = url.getState();
    if (urlState == "Completed") {
      changeToCompleted();
    }else if (urlState == "Active") {
      changeToActive();
    }else {
      changeToList();
    }
  }
});
addClickListener(
  document.getElementsByTagName("label")[0],
  sm,
  handleArrowClick
);
addClickListener(document.getElementsByClassName("clear-completed")[0], sm, handleClearCompletedClick)




sm.subscribeCustomEvent("markAllCompleted", ({ states }) => {
  // Update the visual appearance of checkboxes based on the state
  const todoList = document.querySelector(".todo-list");
  const liElements = todoList.querySelectorAll("li");
  const checkboxes = todoList.querySelectorAll("li .toggle");

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const state = states[i];
    // Update the class attribute of checkboxes and li elements
    checkbox.checked = state.completed;
    liElements[i].classList.toggle("completed", state.completed);
  }
  if ([...checkboxes].some(checkbox => checkbox.checked)) {
    // At least one checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, {class: "clear-completed"})
  } else {
    // No checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, {class: "clear-completed hide"})
  }
});

sm.subscribeCustomEvent("markSomeCompleted", ({ states }) => {
  // Update the visual appearance of checkboxes based on the state
  const todoList = document.querySelector(".todo-list");
  const liElements = todoList.querySelectorAll("li");
  const checkboxes = todoList.querySelectorAll("li .toggle");
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const state = states[i];
    state.completed = checkbox.checked
    const ls = url.getState();
    if (ls == "Active" && checkbox.checked) {
      MF.setAttributes(liElements[i], {class: "completed hide"})
    }else if (ls == "Completed" && !checkbox.checked) {
      MF.setAttributes(liElements[i], {class: "hide"})
    }else if (ls == "All" && !checkbox.checked){
      MF.setAttributes(liElements[i], {class: ""})
    }else if (ls == "All" && checkbox.checked) {
      MF.setAttributes(liElements[i], {class: "completed"})
    }
  }
  sm.setStateNosub(states)

  if ([...checkboxes].some(checkbox => checkbox.checked)) {
    // At least one checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, {class: "clear-completed"})
  } else {
    // No checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, {class: "clear-completed hide"})
  }
});