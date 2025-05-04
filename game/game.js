const avatar = document.getElementById("you");
const infoPopup = document.getElementById("infoPopup");

const messages = {
  bag: "📚 I did my schooling from MVM School in Jabalpur 🏫",
  degree: "🎓 I completed my Bachelor's from GGITS College 💕",
  laptop: "💻 I'm a Python Backend Dev with 6+ years experience 👩‍💻",
  wand: "🪄 I'm skilled in Flask, Ansible, PostgreSQL & more 🌟",
  book: "📁 I will put my projects here. 🚀"
};

const items = document.querySelectorAll(".draggable");

items.forEach(item => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.id);
  });
});

avatar.addEventListener("dragover", (e) => {
  e.preventDefault();
});

avatar.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const msg = messages[id] || "✨ You discovered a secret! ✨";
  infoPopup.textContent = msg;
});

const cursor = document.createElement("div");
cursor.classList.add("cursor-sparkle");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
