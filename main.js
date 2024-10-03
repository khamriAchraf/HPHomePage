const element = document.querySelector(".img");
const body = document.querySelector("body");

let initialMaskSize = 600;
let maskSize = initialMaskSize;
let x = (window.innerWidth / 2) - maskSize / 2;
let y = (window.innerHeight / 4) - maskSize / 2;
let dx = 0;
let dy = 0;
let isMoving = false;
let inactivityTimer;
let moveInterval;
let isAnimatingMask = false;

function updateMaskPosition() {
  element.style.webkitMaskPosition = `${x}px ${y}px`;
  element.style.maskPosition = `${x}px ${y}px`;
}

updateMaskPosition();

function startMoving() {
  isMoving = true;
  const angleVariance = Math.PI / 8;
  const angle = (Math.PI / 4) + (Math.random() - 0.5) * angleVariance;
  dx = Math.cos(angle);
  dy = Math.sin(angle);
  moveInterval = setInterval(moveMask, 20);
}

function stopMoving() {
  isMoving = false;
  clearInterval(moveInterval);
}

function moveMask() {
  const speed = 3;
  x += dx * speed;
  y += dy * speed;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (x <= 0 || x >= windowWidth - maskSize) {
    dx = -dx;
  }
  if (y <= 0 || y >= windowHeight - maskSize) {
    dy = -dy;
  }
  updateMaskPosition();
}

body.addEventListener("mousemove", (event) => {
  x = event.clientX - maskSize / 2;
  y = event.clientY - maskSize / 2;

  updateMaskPosition();

  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(startMoving, 5000);

  if (isMoving) {
    stopMoving();
  }
});

inactivityTimer = setTimeout(startMoving, 5000);

// Animate mask size on click
body.addEventListener("click", () => {
  if (isAnimatingMask) return;
  isAnimatingMask = true;
  clearTimeout(inactivityTimer);
  animateMaskSize(initialMaskSize, initialMaskSize * 4, 500);
  setTimeout(() => {
    animateMaskSize(initialMaskSize * 4, initialMaskSize, 200);
    setTimeout(() => {
      isAnimatingMask = false;
    }, 500);
    inactivityTimer = setTimeout(startMoving, 2000);
  }, 3000);
});

function animateMaskSize(startSize, endSize, duration) {
  const startTime = performance.now();
  const initialX = x + maskSize / 2;
  const initialY = y + maskSize / 2;

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentSize = startSize + (endSize - startSize) * progress;

    element.style.webkitMaskSize = `${currentSize}px`;
    element.style.maskSize = `${currentSize}px`;

    x = initialX - currentSize / 2;
    y = initialY - currentSize / 2;

    updateMaskPosition();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      maskSize = currentSize;
    }
  }

  requestAnimationFrame(animate);
}
