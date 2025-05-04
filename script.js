// Create a function to handle the custom cursor (GIF)
const cursor = document.createElement('div');
cursor.classList.add('cursor-sparkle');
document.body.appendChild(cursor);

// Update the cursor's position as the mouse moves
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX - 15 + 'px'; // Move the cursor element to the mouse's position
  cursor.style.top = e.pageY - 15 + 'px'; // Adjust if necessary based on GIF size
});

// Add a class for the sparkle effect on the cursor
const style = document.createElement("style");
style.textContent = `
  .cursor-sparkle {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10000;
    width: 30px; /* Customize the size of the cursor */
    height: 30px; /* Customize the size of the cursor */
    background-image: url('assets/cursor-heart.gif'); /* Make sure the path to the GIF is correct */
    background-size: contain;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);

// Fun Game Start Button
function startGame() {
  window.location.href = "game.html"; // ✨ navigate to new page
}

// Cute glitter cursor effect
const trail = [];
let i = 0;

document.addEventListener("mousemove", e => {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${e.pageX}px`;
  star.style.top = `${e.pageY}px`;
  document.body.appendChild(star);
  trail.push(star);
  if (trail.length > 30) {
    const old = trail.shift();
    old.remove();
  }
});

const styleStars = document.createElement("style");
styleStars.textContent = `
  .star {
    position: absolute;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #ffc0cb, transparent);
    border-radius: 50%;
    pointer-events: none;
    animation: sparkle 0.6s ease-out forwards;
  }
  @keyframes sparkle {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(2); }
  }
`;
document.head.appendChild(styleStars);

// Function to update background color based on time of day
function updateBackgroundByTime() {
    const hour = new Date().getHours();
    let gradient = "";

    if (hour >= 6 && hour < 12) {
        // Morning 🌸
        gradient = "linear-gradient(120deg, #ffe0f0, #f9f6d2)";
    } else if (hour >= 12 && hour < 17) {
        // Afternoon 🌞
        gradient = "linear-gradient(120deg, #d2f6f9, #e3f0ff)";
    } else if (hour >= 17 && hour < 20) {
        // Evening 🌇
        gradient = "linear-gradient(120deg, #ffd6e0, #ffebd2)";
    } else {
        // Night 🌙
        gradient = "linear-gradient(120deg, #dcd0ff, #cce0ff)";
    }

    document.body.style.background = gradient;
}

// Call it when the page loads
updateBackgroundByTime();

// Change cursor when hovering over clickable elements
const clickableElements = document.querySelectorAll('button, a, input, textarea, select, .clickable');

clickableElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.backgroundImage = "url('assets/pointer.png')"; // Hover cursor
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.backgroundImage = "url('assets/cursor-heart.gif')"; // Default heart cursor
  });
});


// Initialize model
let currentModel = 'tororo';

const models = {
  tororo: "https://cdn.jsdelivr.net/npm/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json",
  hibiki: "https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json",
  izumi: "https://cdn.jsdelivr.net/npm/live2d-widget-model-izumi@1.0.5/assets/izumi.model.json",
  z16: "https://cdn.jsdelivr.net/npm/live2d-widget-model-z16@1.0.5/assets/z16.model.json"
};

// Function to load a model
function loadModel(modelName) {
  const modelUrl = models[modelName];
  if (!modelUrl) {
    console.error("Model not found for:", modelName);
    return;
  }

  // Remove old canvas
  const oldCanvas = document.getElementById("live2dcanvas");
  if (oldCanvas) {
    oldCanvas.remove();
  }

  // Remove old script if exists
  const oldScript = document.querySelector("script[src*='live2d-widget.min.js']");
  if (oldScript) {
    oldScript.remove();
  }

  const script = document.createElement("script");
  script.src = "https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js";
  script.onload = () => {
    setTimeout(() => {
      L2Dwidget.init({
        model: {
          jsonPath: modelUrl,
          scale: 1
        },
        display: {
          position: "right",
          width: 150,
          height: 300,
          hOffset: 0,
          vOffset: -20
        },
        mobile: {
          show: true,
          scale: 0.5
        },
        react: {
          opacityDefault: 0.7,
          opacityOnHover: 0.2
        }
      });

      // Click-to-switch again
      setTimeout(() => {
        const newCanvas = document.getElementById("live2dcanvas");
        if (newCanvas) {
          newCanvas.style.pointerEvents = 'auto';
          newCanvas.style.cursor = 'pointer';
          newCanvas.addEventListener("click", toggleModel);
        }
      }, 500);
    }, 100);
  };

  document.body.appendChild(script);
}


// Toggle between models
const modelNames = Object.keys(models);
let currentIndex = 0;

function toggleModel() {
  currentIndex = (currentIndex + 1) % modelNames.length;
  currentModel = modelNames[currentIndex];
  loadModel(currentModel);
}

// Load initial model when page is ready
window.addEventListener("DOMContentLoaded", () => {
  loadModel(currentModel);
});
