// Import your mini framework
import MF from "../../framework/dom.js";
import StateManager from "../../framework/state.js";
import Router from "../../framework/router.js";
import { appContainer, info } from "./todo.js";
import { createToDoList } from "./todoList.js";
import {
  checkHides,
  updateCount,
  changeToActive,
  changeToList,
  changeToCompleted,
  handleArrowClick,
  handleClearCompletedClick,
  handleNewTodo
} from "./functions.js";
import {
  addEnterKeyListener,
  addClickListener,
} from "../../framework/events.js";

const landingPage = window.location.hash;
let initialStateLanding = "";
if (landingPage == "/" || landingPage == "#/" || landingPage == "") {
  initialStateLanding = "All";
} else if (landingPage == "#/completed") {
  initialStateLanding = "Completed";
} else if (landingPage == "#/active") {
  initialStateLanding == "Active";
}

export const url = new StateManager(initialStateLanding);
export const sm = new StateManager([]);
sm.subscribe(createToDoList);
sm.subscribe(checkHides);
sm.subscribe(updateCount);
sm.subscribe(function() {
  const urlState = url.getState();
  if (urlState == "Completed") {
    changeToCompleted();
  } else if (urlState == "Active") {
    changeToActive();
  } else {
    changeToList();
  }
})

Router.register("#/", changeToList);
Router.register("#/active", changeToActive);
Router.register("#/completed", changeToCompleted);
Router.init(url);

const root = document.getElementById("root");
MF.append(root, appContainer());
MF.append(root, info());

addEnterKeyListener(
  document.getElementById("todo-input"),
  sm,
  handleNewTodo
);
addClickListener(
  document.getElementsByTagName("label")[0],
  sm,
  handleArrowClick
);
addClickListener(
  document.getElementsByClassName("clear-completed")[0],
  sm,
  handleClearCompletedClick
);

const tasks = await fetch("http://localhost:3000/tasks")
const jsonTasks = await tasks.json()
sm.setState(jsonTasks.tasks)

