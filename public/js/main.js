const mobileNav = document.querySelector(".navigation .hamburger");
const navbar = document.querySelector(".navigation .menubar");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", () => toggleNav());
