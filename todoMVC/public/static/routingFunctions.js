import MF from "../../framework/dom.js";

function allList(sm = null, element) {
    const parent = element.parentNode;
    const siblingListItems = parent.parentNode.querySelectorAll("li");
  
    // Reset class attributes of all sibling li elements
    const arr = Array.from(siblingListItems);
  
    for (let i = 0; i < arr.length; i++) {
      const anchor = arr[i].querySelector("a");
  
      if (i === 0) {
        MF.setAttributes(anchor, { class: "selected", href: "#/" });
      } else if (i === 1) {
        MF.setAttributes(anchor, { class: "", href: "#/active" });
      } else if (i === 2) {
        MF.setAttributes(anchor, { class: "", href: "#/completed" });
      }
    }

}

function completedList(sm = null, element) {
  console.log("completedlist: ", element)
    const parent = element.parentNode;
    const siblingListItems = parent.parentNode.querySelectorAll("li");
  
    // Reset class attributes of all sibling li elements
    const arr = Array.from(siblingListItems);
  
    for (let i = 0; i < arr.length; i++) {
      const anchor = arr[i].querySelector("a");
  
      if (i === 0) {
        MF.setAttributes(anchor, { class: "", href: "#/" });
      } else if (i === 1) {
        MF.setAttributes(anchor, { class: "", href: "#/active" });
      } else if (i === 2) {
        MF.setAttributes(anchor, { class: "selected", href: "#/completed" });
      }
    }
}

function activeList(sm = null, element) {
    const parent = element.parentNode;
    const siblingListItems = parent.parentNode.querySelectorAll("li");
  
    // Reset class attributes of all sibling li elements
    const arr = Array.from(siblingListItems);
  
    for (let i = 0; i < arr.length; i++) {
      const anchor = arr[i].querySelector("a");
  
      if (i === 0) {
        MF.setAttributes(anchor, { class: "", href: "#/" });
      } else if (i === 1) {
        MF.setAttributes(anchor, { class: "selected", href: "#/active" });
      } else if (i === 2) {
        MF.setAttributes(anchor, { class: "", href: "#/completed" });
      }
    }
}

export { allList, completedList, activeList };
