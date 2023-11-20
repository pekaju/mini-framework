class StateManager {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = new Set();
  }
  // Set a new state value and notify subscribers
  setState(newState) {
    this.state = newState;
    this.notifySubscribers();
  }
  
  getState() {
    if (Array.isArray(this.state)) {
      return this.state.slice();
    } else if (typeof this.state === "object" && this.state !== null) {
      return Object.assign({}, this.state);
    } else {
      return this.state;
    }
  }
  // Subscribe a function to state changes
  subscribe(callback) {
    this.subscribers.add(callback);
  }

  // Unsubscribe a function from state changes
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
  // Notify all subscribers of a state change
  notifySubscribers() {
    for (const subscriber of this.subscribers) {
      subscriber(this.state);
    }
  }
}

export default StateManager;
