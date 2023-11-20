# Mini-Framework Documentation

This documentation provides an overview of the features and usage of the Mini-Framework.

## Features

- **State Management**: The framework includes a `StateManager` class for managing the application's state.

- **Router**: It includes a simple routing system for handling different views or pages.

- **Event Handling**: Event handling utilities to streamline event binding.

## State Management

The `StateManager` class is used for managing the application's state. It provides the following methods:

- `setState(newState)`: Sets a new state and notifies subscribers.
- `getState()`: Returns the current state.
- `subscribe(callback)`: Subscribes a function to state changes.
- `unsubscribe(callback)`: Unsubscribes a function from state changes.

### Example:

```javascript
// Initialize the StateManager with an initial state
const sm = new StateManager(initialState);

// Subscribe to state changes
sm.subscribe(callback);

// Set a new state and notify subscribers
sm.setState(newState);

// Get the current state
const currentState = sm.getState();

```

## Router
The router is used to manage different views or pages in your application. It provides the following methods:

- `register(route, callback)`: Registers a route with a corresponding callback function.
- `init()`: Initializes the router to handle URL changes.

**Example:**
```javascript
// Register routes and their associated callbacks
Router.register("#/", changeToList);
Router.register("#/active", changeToActive);
Router.register("#/completed", changeToCompleted);

// Initialize the router
Router.init();
```
The register method is used to define routes and their associated callback functions. In this example, routes "#/", "#/active", and "#/completed" are registered with their corresponding callback functions, allowing you to specify what should happen when the URL matches these routes.

The init method initializes the Router by setting up an event listener to watch for changes in the URL hash. When the hash changes, the Router will automatically navigate to the appropriate route, ensuring that your application responds to user navigation.

```javascript
Router.navigate("#/active");
```

The navigate method allows you to programmatically change the route within your application. In this example, we navigate to the "#/active" route, which triggers the associated callback function and updates the URL hash.



## Event Handling

The framework provides utilities for handling events. You can use `addEnterKeyListener` and `addClickListener` functions to bind events to elements.

**Example:**

```javascript
// Add an Enter key listener to an input element
addEnterKeyListener(inputElement, stateManager);

// Add a click listener to a button element
addClickListener(buttonElement, stateManager, clickHandler);
```

## Usage

### Creating an Element

You can use the framework's `MF.create` method to create HTML elements. Here's an example:

```javascript
const element = MF.create("div");
```

### Nesting Elements

You can nest elements using the `MF.append` method. For example:

```javascript
const parent = MF.create("div");
const child = MF.create("span");
MF.append(parent, child);
```

## Adding Attributes to an Element

You can add attributes to an element using the `MF.setAttributes` method. For example:

```javascript
const element = MF.create("button");
MF.setAttributes(element, { class: "btn", type: "button" });
```

## Why Things Work This Way

The framework is designed to provide a simple and intuitive way to create web applications. It follows best practices for state management, routing, and event handling to make it easy for developers to build applications without unnecessary complexity.

Enjoy using the Mini-Framework for your web development projects.

## TodoMVC

TodoMVC is a sample todo-list web page, which is used to compare different frameworks.
 
First clone the repo with
```
git clone https://github.com/pekaju/mini-framework
```

You need npm to run this page on a local machine, and it can be done by moving to backend directory:
```
cd todoMVC/backend
```
and running 
```
npm install
``` 
to install the needed node libraries.
To execute the script run 
```
node server.js
```

