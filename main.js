// Get the element with the clip-path
const element = document.querySelector(".img");
const body = document.querySelector("body");
// Listen for mousemove events on the element
body.addEventListener("mousemove", (event) => {
  // Get the cursor position relative to the element
  const x = event.offsetX-200;
  const y = event.offsetY-200;
  // Set a new clip-path with the cursor position as the center
  element.style.webkitMaskPosition = `${x}px ${y}px`;
});


