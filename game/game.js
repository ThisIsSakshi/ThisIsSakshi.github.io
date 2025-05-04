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

// Allow both mouse and touch events for drag
items.forEach(item => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.id);  // Set data for drag
  });

  item.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    e.target.style.position = "absolute";
    e.target.style.left = touch.pageX - item.offsetWidth / 2 + "px";
    e.target.style.top = touch.pageY - item.offsetHeight / 2 + "px";
    e.target.style.zIndex = 10;  // Bring it above everything else
  });

  item.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    e.target.style.left = touch.pageX - item.offsetWidth / 2 + "px";
    e.target.style.top = touch.pageY - item.offsetHeight / 2 + "px";
  });

  item.addEventListener("touchend", (e) => {
    handleDrop(e.target);
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

// Handle touch drop as well
function handleDrop(item) {
  const id = item.id;
  const msg = messages[id] || "✨ You discovered a secret! ✨";
  infoPopup.textContent = msg;
  item.style.position = "relative";  // Reset position after drop
}

// Custom cursor for mouse interaction
const cursor = document.createElement("div");
cursor.classList.add("cursor-sparkle");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

// Touch cursor positioning for mobile
document.addEventListener("touchmove", (e) => {
  cursor.style.top = e.touches[0].pageY + "px";
  cursor.style.left = e.touches[0].pageX + "px";
});
