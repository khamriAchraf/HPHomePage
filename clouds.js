let time = 0;
// Create a new p5 instance with the canvas element
const canvas = document.getElementById('fog-canvas');
const p5Instance = new p5(p => {
  p.setup = () => {
    // Set up the canvas
    p.createCanvas(canvas.offsetWidth, canvas.offsetHeight);
    p.noStroke();
  };

  p.draw = () => {
    // Clear the canvas
    p.background(255);

    // Generate the fog effect using Perlin noise
    const noiseScale = 0.1;
    const noiseStrength = 100;
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        const noiseValue = p.noise(x * noiseScale, y * noiseScale, time);
        const alphaValue = p.map(noiseValue, 0, 1, 0, 255);
        p.fill(255, 255, 255, alphaValue);
        p.rect(x, y, 1, 1);
      }
    }

    // Update the time elapsed
    time += 0.01;
  };
});
