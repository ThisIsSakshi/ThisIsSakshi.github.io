(function() {
  const canvas = document.getElementById("sakura");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const petals = [];

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.radius = 5 + Math.random() * 5;
      this.density = Math.random() * 0.3 + 0.2; // 🌸 slower fall
      this.tilt = Math.random() * 5 - 2.5;
      this.angle = Math.random() * Math.PI * 2; // 🌸 random start angle
      this.spin = Math.random() * 0.05 - 0.025; // 🌸 spin can go clockwise or counter!
      this.color = "rgba(255,182,193,0.8)";
    }

    draw() {
      ctx.beginPath();
      ctx.ellipse(
        this.x + this.tilt,
        this.y,
        this.radius * 0.6,
        this.radius,
        this.angle,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.y += this.density * 1.5; // 🌸 slower fall speed
      this.x += Math.sin(this.angle) * 1.2;
      this.angle += this.spin;

      if (this.y > height + 5 || this.x > width + 5 || this.x < -5) {
        this.reset();
      }
    }
  }

  for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((petal) => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
})();
