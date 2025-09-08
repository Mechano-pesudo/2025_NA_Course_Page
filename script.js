const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

if (!canvas) {
  console.error("Canvas element not found!");
} else {
  console.log("Canvas initialized successfully.");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const maxStars = 50;
const connectDistance = 150;

class Star {
  constructor(x, y, isNew = false) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.isNew = isNew;
    this.life = isNew ? 300 : Infinity;
  }

  draw() {
    ctx.fillStyle = this.isNew ? "#00b7eb" : "#e6e6fa";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    if (this.isNew) this.life--;
    this.draw();
  }
}

// 初始化星星
for (let i = 0; i < maxStars; i++) {
  stars.push(new Star());
}

// 绘制连线
function drawLines() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < connectDistance) {
        const opacity = 1 - distance / connectDistance;
        ctx.strokeStyle = `rgba(230, 230, 250, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }
  }
}

// 点击添加新星星
canvas.addEventListener("click", (e) => {
  console.log("Click detected at:", e.clientX, e.clientY); // 调试点击
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  stars.push(new Star(x, y, true));
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    if (stars[i].life <= 0) {
      stars.splice(i, 1);
    }
  }
  drawLines();
  requestAnimationFrame(animate);
}

animate();

// 窗口调整
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
