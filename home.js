const audio = document.getElementById("bgMusic");
const cover = document.getElementById("cover-screen");
const pauseBtn = document.getElementById("pauseBtn");

const playlist = [
  "audio files/The Wind - Joe Hisaishi.mp3",
  "audio files/Nahoko (A Rainbow) - Joe Hisaishi.mp3",
  "audio files/Nahoko (An Unexpected Meeting) - Joe Hisaishi.mp3",
  "audio files/Nahoko (Her Destiny) - Joe Hisaishi.mp3",
  "audio files/Nahoko (I Miss You) - Joe Hisaishi.mp3",
  "audio files/Nahoko (The Encounter) - Joe Hisaishi.mp3",
  "audio files/Nahoko (The Proposal) - Joe Hisaishi.mp3",
  "audio files/Nahoko (Together) - Joe Hisaishi.mp3",
  "audio files/A Heart Aflutter - Joe Hisaishi.mp3",
  "audio files/A Journey (A Decision) - Joe Hisaishi.mp3",
  "audio files/A Journey (A Dream of Flight) - Joe Hisaishi.mp3",
  "audio files/A Journey (A Kingdom of Dreams) - Joe Hisaishi.mp3",
  "audio files/A Journey (A Parting) - Joe Hisaishi.mp3",
  "audio files/A Journey (An Encounter at Karuizawa) - Joe Hisaishi.mp3",
  "audio files/A Journey (Caproni Retires) - Joe Hisaishi.mp3",
  "audio files/A Journey (First Day at Work) - Joe Hisaishi.mp3",
  "audio files/A Journey (Italian Winds) - Joe Hisaishi.mp3",
  "audio files/A Journey (Jiro's Sister) - Joe Hisaishi.mp3",
  "audio files/A Journey (The Wedding) - Joe Hisaishi.mp3",
  "audio files/A Shooting Star - Joe Hisaishi.mp3",
  "audio files/Caproni (A Phantom Giant Aircraft) - Joe Hisaishi.mp3",
  "audio files/Caproni (An Aeronautical Designer's Dream) - Joe Hisaishi.mp3",
  "audio files/Castorp (A Separation) - Joe Hisaishi.mp3",
  "audio files/Castorp (The Magic Mountain) - Joe Hisaishi.mp3",
  "audio files/Junkers - Joe Hisaishi.mp3",
  "audio files/Paper Airplane - Joe Hisaishi.mp3",
  "audio files/Prototype 8 - Joe Hisaishi.mp3",
  "audio files/The Falcon - Joe Hisaishi.mp3",
  "audio files/The Falcon Project - Joe Hisaishi.mp3",
  "audio files/The Lifesaver - Joe Hisaishi.mp3",
  "audio files/The Refuge - Joe Hisaishi.mp3"
];

let track = 0;
let zIndexCounter = 400;

audio.src = playlist[track];
audio.volume = 0.4;

/* FIRST INTERACTION */
cover.onclick = () => {
  audio.play();
  cover.style.display = "none";
};

/* PLAYLIST */
audio.onended = () => {
  track = (track + 1) % playlist.length;
  audio.src = playlist[track];
  audio.play();
};

/* MUTE */
pauseBtn.addEventListener("click", () => {
  // Find the image inside the button
  const musicIcon = pauseBtn.querySelector("img");

  if (audio.paused) {
    audio.play();
    // Change back to the "playing" icon
    musicIcon.src = "icons/music.png";
  } else {
    audio.pause();
    // Change to the "muted" icon
    musicIcon.src = "icons/mute.png";
  }
});

/* PIN WINDOWS */
const PIN = "152421";
const isDesktop = window.matchMedia("(pointer:fine)").matches;

function bringToFront(win) {
  zIndexCounter++;
  win.style.zIndex = zIndexCounter;
}

function setupWindow(btnId, winId) {
  const btn = document.getElementById(btnId);
  const win = document.getElementById(winId);
  const close = win.querySelector(".close");
  const unlock = win.querySelector(".unlock");
  const input = win.querySelector(".pincode");
  const content = win.querySelector(".popup-content");
  const header = win.querySelector(".popup-header");

  btn.onclick = () => {
    win.classList.remove("hidden");
    bringToFront(win);
  };

  close.onclick = () => win.classList.add("hidden");

  // --- NEW FIXED CODE ---
  unlock.onclick = () => {
    if (input.value === PIN) {
      const gate = win.querySelector(".auth-section");
      const secretContent = win.querySelector(".popup-content"); // Targets the actual content

      if (gate) gate.style.display = "none";
      if (secretContent) {
        secretContent.classList.remove("hidden"); // This is the crucial fix
        secretContent.style.display = "block";    // Ensures it's visible
      }

      win.classList.add("unlocked");
    } else {
      alert("Incorrect pincode.");
    }
  };




  win.addEventListener("mousedown", () => bringToFront(win));

  /* DRAG — DESKTOP ONLY */
  if (isDesktop) {
    let dragging = false, ox = 0, oy = 0;

    header.onmousedown = e => {
      dragging = true;
      ox = e.clientX - win.offsetLeft;
      oy = e.clientY - win.offsetTop;
    };

    document.addEventListener("mousemove", e => {
      if (!dragging) return;
      win.style.left = e.clientX - ox + "px";
      win.style.top = e.clientY - oy + "px";
      win.style.transform = "none";
    });

    document.addEventListener("mouseup", () => dragging = false);
  }

}

setupWindow("messageBtn", "messageWindow");

/* --- PHOTO JOURNAL DATA --- */
const galleryData = [
  // { img: "imgs/nahoko.jpg", text: "Greetings! About this website: “The wind is rising! We must try to live.” — Paul Valéry. The year is soon to end, and change comes with it — not only with the new year but with new beginnings and challenges. Nevertheless, I wanted to leave this year behind with my deepest sentiments reaching you. I dedicate this website to you, “just because” of the silly hope that you still remember considering me your first patient. If it’s not otherwise, or if I no longer hold that honor, I wanted you to be the patron of my first website, regardless. I also don’t suppose that you already know, but I wanted to tell you that I've started my journey into the tech field in college... I recently completed the first semester and decided to use this break to self-learn some tech stuff that won’t be taught to us. The buttons above will lead you to either the letter I wrote to you or my photo journal for the coming year. Both are 6-code pin-protected. If the code escapes your memory, try recalling the dates that were important to us back in 2021. I truly hope this doesn’t burden you into appreciating it or navigating its contents, but I wanted everything here to reach you nonetheless." },
  // { img: "imgs/download.jpg", text: "Entry 2 — rain braided the world into quiet silver threads." },
  // { img: "gallery/03.jpg", text: "Entry 3 — a window, a table, a thought still warm." },
  // { img: "gallery/04.jpg", text: "Entry 4 — laughter vanished around the corner, almost staying." },
  // { img: "gallery/05.jpg", text: "Entry 5 — the street hummed and carried my name gently." },
  // { img: "gallery/06.jpg", text: "Entry 6 — I kept a promise folded inside my pocket." },

  // extra entries to PROVE scrolling works
  //{ img: "gallery/07.jpg", text: "Entry 7 — the afternoon lingered like a song refusing to end." },
  //{ img: "gallery/08.jpg", text: "Entry 8 — shadows stitched the pavement into memory." },
  //{ img: "gallery/09.jpg", text: "Entry 9 — I watched the light learn how to leave." },
  //{ img: "gallery/10.jpg", text: "Entry 10 — the wind carried a name it would not say aloud." },
  //{ img: "gallery/11.jpg", text: "Entry 11 — the city exhaled, and I exhaled with it." },
  //{ img: "gallery/12.jpg", text: "Entry 12 — somewhere inside it, the day forgave me." }
];


/* DOM HOOKS */
const gallery = document.getElementById("photoGallery");
const viewer = document.getElementById("journalViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerText = document.getElementById("viewerText");
const closeViewer = document.getElementById("closeViewer");

/* Render square gallery grid */
if (gallery) {
  galleryData.forEach((item, i) => {
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = "journal entry " + (i + 1);
    img.dataset.index = i;

    img.onclick = () => {
      viewerImage.src = item.img;
      viewerText.textContent = item.text;
      viewer.classList.remove("hidden");
    };

    gallery.appendChild(img);
  });
}

/* Exit fullscreen viewer */
if (closeViewer) {
  closeViewer.onclick = () => viewer.classList.add("hidden");
}


setupWindow("photoBtn", "photoWindow");

/* PORTRAIT OVERLAY */
document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatarImg");
    const portraitViewer = document.getElementById("portrait-viewer");
    const closePortraitBtn = document.getElementById("close-portrait");

    if (avatar && portraitViewer) {
        avatar.onclick = (e) => {
            e.preventDefault(); // Prevents any accidental link triggers
            portraitViewer.classList.remove("hidden");
            console.log("Portrait opened"); // Check your browser console (F12) to see this
        };
    }

    if (closePortraitBtn) {
        closePortraitBtn.onclick = () => {
            portraitViewer.classList.add("hidden");
        };
    }

    // Close when clicking the dark background
    portraitViewer.onclick = (e) => {
        if (e.target === portraitViewer) {
            portraitViewer.classList.add("hidden");
        }
    };
});