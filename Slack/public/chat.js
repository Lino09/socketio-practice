const socket = io(baseUrl);
let username = null
const getName = () => {
  username = prompt('Please type your username');
  if(username) return;
  getName();
};
getName();
// const clientId = prompt('Whats your username?')

socket.on("namespaces", ({ data: namespaces }) => {
  const nsDiv = $(".namespaces");
  nsDiv.innerHTML = "";
  namespaces.forEach((namespace) => {
    const div = $$("div");
    div.setAttribute("ns", namespace.endpoint);
    div.classList.add("namespace");
    const img = $$("img");
    img.src = namespace.img;
    div.onclick = (e) => {
      const endpoint = e.currentTarget.getAttribute("ns");
      console.log(endpoint);
    };
    div.appendChild(img);
    nsDiv.appendChild(div);
  });
  joinNs('/wiki')
});

