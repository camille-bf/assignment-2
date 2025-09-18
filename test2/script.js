// reset button reloads the page
document.getElementById("resetButton").addEventListener("click", () => {
  location.reload();
});

// audio files instruments for each cube
let audioFiles = [
  "assets/audio-samples/sound1.mp3",
  "assets/audio-samples/sound2.mp3",
  "assets/audio-samples/sound3.mp3",
  "assets/audio-samples/sound4.mp3",
  "assets/audio-samples/sound5.mp3",
  "assets/audio-samples/sound6.mp3",
];

let introModal = document.getElementById("introDialog");
document.getElementById("introDialog").showModal();
document.getElementById("dialogCloseButton").addEventListener("click", () => {
  introModal.close();
});

let allCubes = Array.from(document.getElementsByClassName("cube"));

allCubes.forEach((cube, i) => {
  cube.addEventListener("mousedown", (e) => {
    cube.style.backgroundColor = getRandomColor();
    let audio = new Audio(audioFiles[i]);
    //audio.loop = true;
    audio.play();
  });
});

// random colors to cubes
function getRandomColor() {
  const colors = [
    "#FF66CC",
    "#66CCFF",
    "#CCFF66",
    "#FFCC66",
    "#9966FF",
    "#00FFFF",
    "#FF00FF",
    "#FF9900",
    "#66FFCC",
    "#FF66FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
allCubes.forEach((cube) => {
  cube.style.backgroundColor = getRandomColor();
});

let cubes = document.querySelectorAll(".cube");

// bouncing animation
let container = document.querySelector(".cubesCont");

let blocks = [...cubes].map((c) => {
  return {
    el: c,
    x: c.offsetLeft,
    y: c.offsetTop,
    dx: (Math.random() - 0.5) * 3,
    dy: (Math.random() - 0.5) * 3,
  };
});

function animate() {
  let contSize = container.getBoundingClientRect();
  blocks.forEach((cube) => {
    cube.x += cube.dx;
    cube.y += cube.dy;
    if (cube.x <= 0 || cube.x >= contSize.width) cube.dx *= -1;
    if (cube.y <= 0 || cube.y >= contSize.height) cube.dy *= -1;
    cube.el.style.left = cube.x + "px";
    cube.el.style.top = cube.y + "px";
  });
  requestAnimationFrame(animate);
}
animate();

// Drag and drop

let selected = null,
  offX = 0,
  offY = 0;
document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cube")) {
    selected = blocks.find((s) => s.el === e.target);
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
