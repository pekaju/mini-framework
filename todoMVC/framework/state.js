class StateManager {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = new Set();
    this.customEventListeners = new Map();
  }
  // Set a new state value and notify subscribers
  setState(newState) {
    this.state = newState;
    this.notifySubscribers();
  }

  setStateNosub(newState) {
    this.state = newState;
  }
   // Get the current state
   getState() {
    return this.state;
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

  subscribeCustomEvent(eventName, callback) {
    if (!this.customEventListeners.has(eventName)) {
      this.customEventListeners.set(eventName, new Set());
    }
    this.customEventListeners.get(eventName).add(callback);
  }

  // Add a method to trigger custom events
  triggerCustomEvent(eventName, eventData) {
    if (this.customEventListeners.has(eventName)) {
      for (const callback of this.customEventListeners.get(eventName)) {
        callback(eventData);
      }
    }
  }

}

export default StateManager;