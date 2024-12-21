// theme

const toggleThemeBtn = document.getElementById("toggle-theme-btn");

let currentThemeSetting = localStorage.getItem("theme") || "default-dark";
document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

toggleThemeBtn.addEventListener("click", () => {
  const newTheme =
    currentThemeSetting === "default-dark" ? "light" : "default-dark";
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currentThemeSetting = newTheme;
});

// theme

// time

const toggleTimeButtons = document.querySelectorAll(".toggle-time-menu-btn");

toggleTimeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".time-menubar").classList.remove("hidden");
    document
      .querySelector(".menubar-full")
      .classList.replace("menubar-full", "menubar-withtime");
  });
});

const disableTimeButtons = document.querySelectorAll(".disable-time-menu-btn");

disableTimeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".time-menubar").classList.add("hidden");
    document
      .querySelector(".menubar-withtime")
      .classList.replace("menubar-withtime", "menubar-full");
  });
});

// time
