window.addEventListener("load", () => {
  const loader = document.getElementById("medicalLoader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hide");

      setTimeout(() => {
        loader.style.display = "none";
        AOS.refreshHard();
      }, 800);

    }, 2200);
  }
});



const hamburger = document.querySelector(".hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  if (sidebar.classList.contains("active")) {

    // Reset AOS classes manually
    const aosItems = sidebar.querySelectorAll("[data-aos]");

    aosItems.forEach(item => {
      item.classList.remove("aos-animate");
    });

    // Recalculate AOS
    setTimeout(() => {
      AOS.refreshHard();
    }, 500);
  }
});

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});
