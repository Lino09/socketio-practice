const joinRoom = (room) => {
  nsSocket.emit("switchRoom", { data: room }, (numberOfMembers) => {
    $(".curr-room-num-users").innerHTML =
      numberOfMembers + ' <span class="glyphicon glyphicon-user"></span>';
  });
};
