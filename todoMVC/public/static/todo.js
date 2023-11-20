import MF from "../../framework/dom.js";
import { addClickListener } from "../../framework/events.js";
import { sm } from "./main.js"
import { completedList, activeList, allList } from "./routingFunctions.js";

//Crete the main section with header and footer.
export function appContainer() {

  function mainSection() {
    // Create the main section for the todo list
    const mainSection = MF.create("section");
    MF.setAttributes(mainSection, { class: "main hide" });

    // Create the toggle-all checkbox
    const toggleAll = MF.create("input");
    MF.setAttributes(toggleAll, {
      id: "toggle-all",
      class: "toggle-all",
      type: "checkbox",
    });
    const toggleLabel = MF.create("label");
    toggleLabel.setAttribute("for", "toggle-all");
    toggleLabel.textContent = "Mark all as complete";
    mainSection.appendChild(toggleAll);
    mainSection.appendChild(toggleLabel);

    // Create the todo list
    const todoList = MF.create("ul");
    todoList.classList.add("todo-list");
    mainSection.appendChild(todoList);
    return mainSection;
  }

  // Create the main container for the TodoMVC app
  const appContainer = MF.create("section");
  MF.setAttributes(appContainer, { class: "todoapp" });

  // Create the header section
  const header = MF.create("header");
  const heading = MF.create("h1");
  heading.textContent = "todos";
  MF.append(header, heading);

  // Create the todo input form
  const todoForm = MF.create("form");
  const todoInput = MF.create("input");
  MF.setAttributes(todoInput, {
    id: "todo-input",
    class: "new-todo",
    placeholder: "What needs to be done?",
    autofocus: true,
    type: "text",
  });

  //Create footer
  const footer = MF.create("footer");
  MF.setAttributes(footer, { class: "footer hide" });
  const count = MF.create("span");
  MF.setAttributes(count, { class: "todo-count" });
  const strong = MF.create("strong");
  const items = sm.getState();
  strong.textContent = items.length;
  MF.append(footer, count);
  MF.append(count, strong);
  const itemsLeft = MF.create("span")
  itemsLeft.textContent = items.length == 1 ? " item left " : " items left " ;
  MF.append(count, itemsLeft)
  const choice = MF.create("ul");
  MF.setAttributes(choice, {class: "filters"})
  const li1 = MF.create("li");
  const li2 = MF.create("li");
  const li3 = MF.create("li");
  const a1 = MF.create("a");
  addClickListener(a1, sm, allList)
  a1.textContent = "All";
  MF.setAttributes(a1, {class: "selected", href: "#/"})
  const a2 = MF.create("a");
  addClickListener(a2, sm, activeList)

  a2.textContent = "Active";
  MF.setAttributes(a2, {href: "#/active"})

  const a3 = MF.create("a");
  addClickListener(a3, sm, completedList)

  a3.textContent = "Completed";
  MF.setAttributes(a3, {href: "#/completed"})

  MF.append(li1, a1);
  MF.append(li2, a2);
  MF.append(li3, a3);

  MF.append(choice, li1);
  const span1 = MF.create("span");
  span1.textContent = " "

  MF.append(choice, span1)

  MF.append(choice, li2);
  const span2 = MF.create("span");
  span2.textContent = " "
  MF.append(choice, span2)

  MF.append(choice, li3);

  MF.append(footer, choice);
  const clearCompleted = MF.create("button");
  MF.setAttributes(clearCompleted, {
    class: "clear-completed hide",
  });
  clearCompleted.textContent = "Clear completed"
  MF.append(footer, clearCompleted)
  const sectionMain = mainSection();
  MF.append(todoForm, todoInput);
  MF.append(header, todoForm);
  MF.append(appContainer, header);
  MF.append(appContainer, sectionMain);
  MF.append(appContainer, footer);

  return appContainer;
}

//Create the class info section
export function info() {
  const info = MF.create("footer");
  MF.setAttributes(info, { class: "info" });

  const paragraph1 = MF.create("p");
  paragraph1.textContent = "Double-click to edit a todo";
  const paragraph2 = MF.create("p");
  paragraph2.textContent = "Created by ";
  const createdByLink = MF.create("a");
  MF.setAttributes(createdByLink, {
    href: "https://01.kood.tech/git/pkaju/mini-framework.git",
  });
  createdByLink.textContent = "pekaju";
  MF.append(paragraph2, createdByLink);
  const paragraph3 = MF.create("p");
  paragraph3.textContent = "Part of ";
  const todoMVCLink = MF.create("a");
  MF.setAttributes(todoMVCLink, { href: "http://todomvc.com" });
  todoMVCLink.textContent = "TodoMVC";
  MF.append(paragraph3, todoMVCLink);

  // Append the paragraphs to the footer
  MF.append(info, paragraph1);
  MF.append(info, paragraph2);
  MF.append(info, paragraph3);

  return info;
}
