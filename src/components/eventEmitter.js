const eventListeners = {};

const addEventListener = (eventName, callback) => {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = [];
  }
  eventListeners[eventName].push(callback);
};

const removeEventListener = (eventName, callback) => {
  if (eventListeners[eventName]) {
    eventListeners[eventName] = eventListeners[eventName].filter(
      (cb) => cb !== callback
    );
  }
};

const emitEvent = (eventName, data) => {
  if (eventListeners[eventName]) {
    eventListeners[eventName].forEach((callback) => {
      callback(data);
    });
  }
};

export { addEventListener, removeEventListener, emitEvent };
