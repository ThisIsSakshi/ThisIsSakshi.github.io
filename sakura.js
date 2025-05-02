(function() {
    const canvas = document.getElementById("sakura");
    const ctx = canvas.getContext("2d");
  
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
        this.density = Math.random() * 0.5 + 0.5;
        this.tilt = Math.random() * 5 - 2.5;
        this.angle = 0;
        this.spin = Math.random() * 0.02;
        this.color = "rgba(255,182,193,0.8)"; // soft pink
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
        this.y += this.density * 2;
        this.x += Math.sin(this.angle) * 1.5;
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
  