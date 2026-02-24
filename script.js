window.addEventListener("load", () => {
  const loader = document.getElementById("medicalLoader");
  const mainContent = document.querySelector("main");
  const LOADER_TIME = 2500;

  // 1. Initialize GSAP Timeline in a paused state
  const tl = gsap.timeline({ 
    paused: true, // Prevents animation from starting early
    defaults: { ease: "power4.out" } 
  });

  // Build your timeline structure (as we did before)
  tl.from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 })
    .from(".hero-title", { y: 80, skewY: 5, opacity: 0, duration: 1.2 }, "-=0.6")
    .from(".hero-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.8")
    .from(".hero-btn", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)", clearProps: "all" }, "-=0.6")
    .from(".hero-image", { clipPath: "inset(0% 0% 100% 0%)", duration: 1.4, ease: "power4.inOut" }, "0.3")
    .from(".hero-image img", { scale: 1.3, duration: 2, ease: "power2.out" }, "0.3")
    .from(".floating-badge", { x: -50, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.5");

  // Add the infinite floating after the entrance completes
  tl.add(() => {
    gsap.to(".floating-badge", { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-image img", { y: -8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  });

  // 2. Loader Logic
  setTimeout(() => {
    /* Fade loader */
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";

      /* Show main */
      mainContent.style.visibility = "visible";
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";

      /* 🔥 Trigger GSAP Animation */
      tl.play(); 

      /* 🔥 Prepare AOS */
      AOS.refreshHard();
      document.dispatchEvent(new Event("aos:ready"));

    }, 600); // matches CSS transition
  }, LOADER_TIME);
});


// 1. SELECT ELEMENTS
const hamburger = document.querySelector(".hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const homeCaret = document.getElementById("home-caret");
const homeDropdown = document.getElementById("home-dropdown");

// 2. SIDEBAR TOGGLE LOGIC (HAMBURGER CLICK)
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // AOS Animation Reset when sidebar opens
    if (sidebar.classList.contains("active")) {
        const aosItems = sidebar.querySelectorAll("[data-aos]");
        
        aosItems.forEach(item => {
            item.classList.remove("aos-animate");
        });

        // Small delay to allow sidebar to slide in before AOS starts
        setTimeout(() => {
            AOS.refreshHard();
        }, 500);
    }
});

// 3. HOME DROPDOWN TOGGLE (CARET CLICK)
// Specifically handles showing/hiding Home 2 and rotating the arrow
if (homeCaret) {
    homeCaret.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents click from bubbling up
        
        homeDropdown.classList.toggle("open");
        homeCaret.classList.toggle("rotate");
    });
}

// 4. OVERLAY CLICK LOGIC (CLOSE EVERYTHING)
overlay.addEventListener("click", () => {
    // Close sidebar elements
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    
    // Reset dropdown state so it's closed next time you open sidebar
    if (homeDropdown) {
        homeDropdown.classList.remove("open");
        homeCaret.classList.remove("rotate");
    }
});

// Drop Down
// 5)) DROP DOWN TOGGLE LOGIC (DROPDOWN ICON CLICK)
    const dropdown = document.querySelector(".dropdown");
    const dropToggle = document.querySelector(".drop-toggle"); // Target the icon specifically

    dropToggle.addEventListener("click", function (e) {
      e.preventDefault(); // Stop the page from jumping/refreshing
      e.stopPropagation(); // Stop click from bubbling to window
      dropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", function () {
      dropdown.classList.remove("active");
    });