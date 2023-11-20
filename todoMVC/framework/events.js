
function addClickListener(element, sm, callback) {
  element.addEventListener("click", () => {
    callback(sm, element);
  });
}
function addHoverListener(element, sm, callback) {
  element.addEventListener("mouseenter", () => {
    callback(sm, element);
  });
}

function addEnterKeyListener(element, sm, callback) {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputValue = element.value.trim();
      callback(sm, inputValue);
      element.value = "";
    }
  });
}

export { addEnterKeyListener, addClickListener, addHoverListener };