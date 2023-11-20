import MF from "../../framework/dom.js";
import { addHoverListener, addClickListener } from "../../framework/events.js";
import { sm } from "./main.js";
import { handleLiHover, destroyFn, handleSingleClick } from "./functions.js";

function createToDoItem(listItem) {
  console.log(listItem);
  const view = MF.create("div");
  MF.setAttributes(view, { class: "view" });
  const checkbox = MF.create("input");
  MF.setAttributes(checkbox, { type: "checkbox", class: "toggle" });
  const label = MF.create("label");
  label.textContent = listItem.description;
  const button = MF.create("button");
  MF.setAttributes(button, { class: "destroy hide" });
  addClickListener(button, sm, destroyFn);
  MF.append(view, checkbox);
  MF.append(view, label);
  MF.append(view, button);
  return view;
}

function createEdit(content, li, viewDiv) {
  const ip = MF.create("input");
  MF.setAttributes(ip, { class: "edit hide", value: content });
  li.addEventListener("dblclick", (event) => {
    if (
      (event.target.tagName === "INPUT" &&
        event.target.classList.contains("toggle")) ||
      event.target.tagName === "BUTTON"
    ) {
      return;
    }
    MF.setAttributes(ip, { class: "edit" });
    MF.setAttributes(li, { class: "editing" });
    MF.setAttributes(viewDiv, { class: "view hide" });
    ip.focus();
    ip.selectionStart = ip.value.length;
    const finishEditing = async (event) => {
      document.removeEventListener("keydown", onEnterKey);
      document.removeEventListener("click", onClickOutside);
      const response = await fetch(`http://localhost:3000/tasks/${li.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: ip.value }),
      });
      const json = await response.json();
      sm.setState(json.tasks);
    };

    const onEnterKey = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        finishEditing();
      }
    };

    const onClickOutside = (event) => {
      if (event.target !== ip) {
        event.preventDefault();
        finishEditing();
      }
    };
    document.addEventListener("keydown", onEnterKey);
    document.addEventListener("click", onClickOutside);
  });

  return ip;
}

export function createToDoList(list) {
  const ul = document.getElementsByClassName("todo-list")[0];
  MF.deleteChildren(ul);
  list.forEach((element) => {
    const li = MF.create("li");
    const viewDiv = createToDoItem(element);
    if (element.completed) {
      viewDiv.querySelector(".toggle").checked = true;
      MF.setAttributes(li, { class: "completed", id: element.id });
    } else {
      MF.setAttributes(li, { id: element.id });
    }
    MF.append(li, viewDiv);
    MF.append(li, createEdit(element.description, li, viewDiv));
    MF.append(ul, li);
    addHoverListener(li, sm, handleLiHover);
  });
  const checkboxes = document.querySelectorAll(".toggle");
  checkboxes.forEach((checkBox) => {
    addClickListener(checkBox, sm, handleSingleClick);
  });
  if ([...checkboxes].some((checkbox) => checkbox.checked)) {
    // At least one checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, { class: "clear-completed" });
  } else {
    // No checkbox is checked
    const btn = document.getElementsByClassName("clear-completed")[0];
    MF.setAttributes(btn, { class: "clear-completed hide" });
  }
}
