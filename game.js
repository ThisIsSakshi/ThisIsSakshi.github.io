const avatar = document.getElementById("you");
const infoPopup = document.getElementById("infoPopup");

const messages = {
  bag: "📚 I did my schooling from XYZ School in Jabalpur 🏫",
  degree: "🎓 I completed my Bachelor's from ABC College 💕",
  laptop: "💻 I'm a Python Backend Dev with 6+ years experience 👩‍💻",
  wand: "🪄 I'm skilled in Flask, Ansible, PostgreSQL & more 🌟",
  book: "📁 I've built cool projects like a Portfolio Site, API systems etc. 🚀"
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
