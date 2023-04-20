
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.addEventListener('mousemove', updateMouse);
  animate();
}

function updateMouse(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function animate() {
  // Define los gradientes de color para el fondo y el círculo
  const backgroundGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const circleGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
  const t = mouseY / canvas.height;
  backgroundGradient.addColorStop(0, `rgba(${Math.floor(255 * t)}, ${Math.floor(255 * t)}, ${Math.floor(255 * t)}, 1)`);
  backgroundGradient.addColorStop(1, `rgba(0, 0, ${Math.floor(255 * (1 - t))}, 1)`);
  circleGradient.addColorStop(0, '#ff8c00');
  circleGradient.addColorStop(1, '#f6546a');
  
  // Dibuja el fondo y un círculo que sigue el cursor
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const distance = Math.sqrt((canvas.width/2 - mouseX)**2 + (canvas.height/2 - mouseY)**2);
  const radius = distance * 0.1;
  ctx.fillStyle = circleGradient;
  ctx.beginPath();
  //ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Repite la animación
  requestAnimationFrame(animate);
}

init();