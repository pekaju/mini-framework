import { sm } from "./main.js";
import MF from "../../framework/dom.js";
import { addClickListener } from "../../framework/events.js";

export function destroyFn(sm, element) {
    const listItem = element.closest('li');
    if (listItem) {
      const ulElement = listItem.parentNode;
  
      const allListItems = ulElement.querySelectorAll('li');
  
      const index = Array.from(allListItems).indexOf(listItem);
  
      const states = sm.getState();
  
      if (index >= 0 && index < states.length) {
        // Remove the state element at the specified index
        states.splice(index, 1);
  
        // Set the state to a new one without the removed element
        sm.setState(states);
      }
    }
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

export function handleClearCompletedClick(sm, element) {
    const states = sm.getState();
    const newStates = states.filter(state => !state.completed);
    
    sm.setState(newStates);
}

export function handleLiHover(sm, element) {
    const destroyElement = element.querySelector('.destroy');

    // Check if the destroyElement exists
    if (destroyElement) {
        // Change the classname to still be "destroy"
        destroyElement.className = 'destroy';
    }
}


export function handleSingleClick(sm, element) {
  const states = sm.getState();
  sm.triggerCustomEvent("markSomeCompleted", { states });
}

export function getCorrectCheckboxes() {
  const inputs = document.getElementsByTagName("input");
  const checkboxes = Array.from(inputs).filter(
    (item) => item.type === "checkbox"
  );
  const correctCheckboxes = Array.from(checkboxes).filter(
    (item) => item.class !== "toggle-all"
  );
  correctCheckboxes.forEach((cb) =>
    addClickListener(cb, sm, handleSingleClick)
  );
}

export function handleArrowClick(sm, element) {
  const states = sm.getState();
  if (states.every((state) => state.completed)) {
    states.forEach((state) => {
      state.completed = false;
    });
  } else {
    states.forEach((state) => {
      state.completed = true;
    });
  }
  sm.triggerCustomEvent("markAllCompleted", { states });
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

    liElements.forEach(li => {
      // Check if the li element contains the class "completed"
      if (li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, {class: "completed hide"})
      }else {
        MF.setAttributes(li, {class: ""})
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

    liElements.forEach(li => {
      // Check if the li element contains the class "completed"
      if (!li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, {class: "hide"})
      }
      else {
        MF.setAttributes(li, {class: "completed"})
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

    liElements.forEach(li => {
      // Check if the li element contains the class "completed"
      if (li.classList.contains("completed")) {
        // Replace "completed" with "completed hide"
        MF.setAttributes(li, {class: "completed"})
      }
      else {
        MF.setAttributes(li, {class: ""})
      }
    });
  }
}