document.getElementById("resetButton").addEventListener("click", () => {
  location.reload();
});
// audio files instruments for each cube
let audioFiles = [
  "assets/audio-samples/piano.mp3",
  "assets/audio-samples/accordeon.mp3",
  "assets/audio-samples/clarinette.mp3",
  "assets/audio-samples/flute.mp3",
  "assets/audio-samples/guitare.mp3",
  "assets/audio-samples/harmonica.mp3",
  "assets/audio-samples/saxo.mp3",
  "assets/audio-samples/tambour.mp3",
  "assets/audio-samples/trompette.mp3",
  "assets/audio-samples/violon.mp3",
];

let introModal = document.getElementById("introDialog");
document.getElementById("introDialog").showModal();
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

let allCubes = Array.from(document.getElementsByClassName("cube"));

allCubes.forEach((cube) => {
  cube.style.backgroundColor = getRandomColorVariation();
});

allCubes.forEach((cube, i) => {
  cube.addEventListener("mousedown", (e) => {
    cube.style.backgroundColor = getRandomColorVariation();
    let audio = new Audio(audioFiles[i]);
    audio.play();
  });
});

function getRandomColorVariation() {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

let cubes = document.querySelectorAll(".cube");

// bouncing animation
let container = document.querySelector(".cubesContainer");
let states = [...cubes].map((c) => {
  return {
    el: c,
    x: c.offsetLeft,
    y: c.offsetTop,
    dx: (Math.random() - 0.5) * 3,
    dy: (Math.random() - 0.5) * 3,
  };
});

function animate() {
  let rect = container.getBoundingClientRect();
  states.forEach((s) => {
    s.x += s.dx;
    s.y += s.dy;

    if (s.x <= 0 || s.x + s.el.offsetWidth >= rect.width) s.dx *= -1;
    if (s.y <= 0 || s.y + s.el.offsetHeight >= rect.height) s.dy *= -1;

    s.el.style.left = s.x + "px";
    s.el.style.top = s.y + "px";
  });
  requestAnimationFrame(animate);
}
animate();

// Drag and drop
let selected = null,
  offX = 0,
  offY = 0,
  lastX = 0,
  lastY = 0;

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cube")) {
    selected = states.find((s) => s.el === e.target);
    offX = e.clientX - selected.x;
    offY = e.clientY - selected.y;
    lastX = e.clientX;
    lastY = e.clientY;
    selected.dx = 0;
    selected.dy = 0;
  }
});

document.addEventListener("mousemove", (e) => {
  if (selected) {
    selected.x = e.clientX - offX;
    selected.y = e.clientY - offY;
    selected.dx = e.clientX - lastX;
    selected.dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

document.addEventListener("mouseup", () => {
  if (selected) {
    selected = null;
  }
});
