document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const form = document.getElementById("homeSearch");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("The search design is ready. Live property results will appear after an IDX provider is connected.");
    });
  }
});
