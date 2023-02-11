const joinNs = (endpoint) => {
  nsSocket = io(`${baseUrl}${endpoint}`);
  nsSocket.on("rooms", ({ data: rooms }) => {
    const roomList = $(".room-list");
    roomList.innerHTML = "";
    rooms.forEach((room) => {
      const li = $$("li");
      li.onclick = (e) => {
        console.log(e.currentTarget);
      };
      const span = $$("span");
      const glyph = $$("span");
      span.innerText = room.roomTitle;
      span.classList.add("room");
      glyph.classList.add(
        "glyphicon",
        `glyphicon-${room.privateRoom ? "lock" : "globe"}`
      );
      li.append(glyph, span);
      roomList.appendChild(li);
    });
    joinRoom($(".room").innerText);
  });

  nsSocket.on("newMessage", ({ data }) => {
    const { message, username, date } = data;
    //CREATE ELEMENTS
    const li =  $$("li");
    const div = $$("div");
    const div2 =$$("div");
    const div3 =$$("div");
    const div4 =$$("div");
    const img = $$("img");
    //ADD THEM TO UI
    div.classList.add("user-image");
    img.src = "https://via.placeholder.com/30";
    div2.classList.add("user-message");
    div3.classList.add("user-name-time");
    div3.innerHTML = `${username} <span>${date}</span>`;
    div4.classList.add("message-text");
    div4.innerText = message;
    li.append(div, div2);
    div.appendChild(img);
    div2.append(div3, div4);
    $('#messages').appendChild(li)
  });

  $(".message-form").onsubmit = (e) => {
    e.preventDefault();
    const message = $("#user-message").value;
    $("#user-message").value = "";
    if (!message) return;
    nsSocket.emit("chatMessage", { data: { username, message } });
  };
};
