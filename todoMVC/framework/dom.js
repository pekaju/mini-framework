const allowedElements = [
    'html',
    'head',
    'meta',
    'title',
    'link',
    'style',
    'body',
    'script',
    'section',
    'header',
    'h1',
    'form',
    'input',
    'ul',
    'li',
    'div',
    'label',
    'button',
    'a',
    'strong',
    'p',
    'footer',
    'span',
    'href'
  ];

const MF = {
  create: (tagName) => {
    if (!allowedElements.includes(tagName)) {
        const errorMessage = `MyFramework Error: Element "${tagName}" is not allowed.`;
        console.error(`%c${errorMessage}`, 'color: red; font-weight: bold;');
    }
    return document.createElement(tagName);
  },

  setAttributes: (element, attributes) => {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  },

  append: (parent, child) => {
    parent.appendChild(child);
  },

  hasClass: (element, className) => {
    return element.classList.contains(className);
  },
  
  deleteChildren: (e) => {
    var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
  },

  getChildren: (element, ...tagNames) => {
    const children = element.children;
    if (tagNames.length === 0) {
      return Array.from(children);
    } else {
      const filteredChildren = Array.from(children).filter((child) =>
        tagNames.includes(child.tagName.toLowerCase())
      );
      return filteredChildren;
    }
  }


};

export default MF;
