// ===== Handle Signup =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    console.log("Signed up:", email, password);
    window.location.href = "index.html";
  });
}

// ===== Handle Signin =====
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    console.log("Signed in:", email, password);
    window.location.href = "index.html";
  });
}

// ===== Navbar Scroll Shadow =====
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});