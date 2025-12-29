// Ensure script runs after HTML loads
document.addEventListener("DOMContentLoaded", () => {
  const welcomeLines = [
    "Once,",
    "you considered me...",
    "your very first patient.",
    "So,",
    "I dedicate to you...",
    "My very first project...",
		"in website development:",
		"The wind is rising —",
		"we must try to live.",
		"From me,",
		"to you.",
    "Welcome, Dae!"
  ];

  let currentLine = 0;

  // Select elements
  const container = document.getElementById("welcome-container");
  const textElement = document.getElementById("welcome-text");
  const music = document.getElementById("bg-music");
  const pauseBtn = document.getElementById("pauseBtn");

	container.addEventListener("click", () => {
    // IDIOT-PROOF: Show buttons and start music on the first click
    if (currentLine === 0) {
      pauseBtn.style.display = "flex";
      document.getElementById("skipBtn").style.display = "flex";
      
      // Attempt to play music (fixes browser autoplay blocks)
      music.play();
      pauseBtn.querySelector('span').innerHTML = `MUTE <img src="icons/music.png" alt="Music" height="25">`;
    }

    if (currentLine < welcomeLines.length) {
      textElement.innerHTML = ""; 

      // RESET Animation
      textElement.style.animation = 'none';
      textElement.offsetHeight; 
      textElement.style.animation = 'fadeInUp 0.8s ease forwards';

      // UPDATE Text
      textElement.textContent = welcomeLines[currentLine];
      currentLine++;
    } else {
      // REDIRECT when finished
      document.body.classList.add('fade-out');
      setTimeout(() => {
          window.location.href = "home.html";
      }, 1000);
    }
  });

	  // 2. PAUSE / PLAY MUSIC Logic
  pauseBtn.addEventListener("click", (e) => {
    const btnSpan = pauseBtn.querySelector('span');
    
    if (music.paused) {
      music.play();
      btnSpan.innerHTML = `MUTE <img src="icons/music.png" alt="Music" height="25">`;
    } else {
      music.pause();
      btnSpan.innerHTML = `PLAY <img src="icons/mute.png" alt="Muted" height="25">`;
    }
  });		

});

