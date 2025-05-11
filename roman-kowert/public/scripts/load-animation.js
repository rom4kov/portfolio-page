// Once React is injected, add a class to the body to hide the animation

const appRootElement = document.querySelector("#animation-wrapper");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("react-injected");
    appRootElement.classList.add("react-injected");
  }, 1500);
});
