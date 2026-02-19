window.addEventListener("load", () => {

  const loader = document.getElementById("medicalLoader");
  const mainContent = document.querySelector("main");

  const LOADER_TIME = 2500;

  setTimeout(() => {

    /* Fade loader */
    loader.style.opacity = "0";

    setTimeout(() => {

      loader.style.display = "none";

      /* Show main with transform */
      mainContent.style.visibility = "visible";
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";

      /* 🔥 Prepare AOS positions */
      AOS.refreshHard();

      /* 🔥 Trigger AOS manually */
      document.dispatchEvent(new Event("aos:ready"));

    }, 600); // match CSS transition

  }, LOADER_TIME);

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
