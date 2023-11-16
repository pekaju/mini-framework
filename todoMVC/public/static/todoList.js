import MF from "../../framework/dom.js";
import { addHoverListener, addClickListener } from "../../framework/events.js";
import { sm } from "./main.js";
import { handleLiHover, destroyFn } from "./functions.js";

function createToDoItem(content) {
  const view = MF.create("div");
  MF.setAttributes(view, { class: "view" });
  const checkbox = MF.create("input");
  MF.setAttributes(checkbox, { type: "checkbox", class: "toggle" });
  const label = MF.create("label");
  label.textContent = content;
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
      event.target.tagName === "INPUT" &&
      event.target.classList.contains("toggle") ||
      event.target.tagName === "BUTTON"
    ) {
      return;
    }
    MF.setAttributes(ip, { class: "edit" });
    MF.setAttributes(li, { class: "editing" });
    MF.setAttributes(viewDiv, { class: "view hide" });
    ip.focus();
    ip.selectionStart = ip.value.length;

    const finishEditing = () => {
      let states = sm.getState();
      console.log(li)
      console.log(li.parentNode)
      const ulElement = li.parentNode;
      const allListItems = ulElement.querySelectorAll("li");

      const index = Array.from(allListItems).indexOf(li);
      if (ip.value !== "") {
        states[index].description = ip.value;
        sm.setState(states)
      } else {
        states.splice(index, 1);
        sm.setState(states);
      }
      document.removeEventListener("keydown", onEnterKey);
      document.removeEventListener("click", onClickOutside);
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
    const viewDiv = createToDoItem(element.description, element.completed);
    if (element.completed) {
        viewDiv.querySelector(".toggle").checked = true;
        MF.setAttributes(li, {class: "completed"})
    }
    MF.append(li, viewDiv);
    MF.append(li, createEdit(element.description, li, viewDiv));
    MF.append(ul, li);
    addHoverListener(li, sm, handleLiHover);
  });

}
