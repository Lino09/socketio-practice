class Namespace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id
    this.nsTitle = nsTitle
    this.img = img
    this.endpoint = endpoint 
  }
  #rooms = []
  
  addRoom(roomObj){
    this.#rooms.push(roomObj)
    return this
  }
  getRooms() {
    return this.#rooms
  }
};

module.exports = Namespace;