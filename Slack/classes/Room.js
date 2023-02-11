class Room {
  constructor(id, roomTitle, namespace, privateRoom = false) {
    this.id = id
    this.roomTitle = roomTitle
    this.namespace = namespace
    this.privateRoom = privateRoom
  }
  #history = [];
  addMessage(message) {
    this.#history.push(message) = [];
    return this
  }
  clearHistory() {
    this.#history = []
    return this
  }
  getHistory() {
    return this.#history
  }
};

module.exports = Room;