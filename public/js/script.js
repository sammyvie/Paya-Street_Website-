// ═══════════════════════════════════════════════════════════════
//  Paya Street Coffee — Main Script
//  Includes: navbar, animations, search, cart, checkout
// ═══════════════════════════════════════════════════════════════

/* ── 1. Navbar scroll shadow ─────────────────────────────────── */
window.addEventListener("scroll", () => {
  const navbar =
    document.getElementById("navbar") ||
    document.querySelector(".navbar");

  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  }
}, { passive: true });

/* ── 2. Hamburger menu toggle ────────────────────────────────── */
const navToggle = document.querySelector(".nav-toggle");
const navList =
  document.querySelector(".navbar .nav-links") ||
  document.querySelector(".navbar ul");

if (navToggle && navList) {

  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
    });
  });
}

/* ── 3. Scroll reveal animations ─────────────────────────────── */
(function () {

  const selectors = [
    // hero-content and hero-image are intentionally excluded here
    // — section 4 handles them with its own intro animation so
    // the flex row layout doesn't break on page load
    ".about-text",
    ".card",
    ".community-block",
    "#captions",
    ".contact-content",
    ".contact-info",
    ".contact-image",
    ".gallery-row",
    ".about-video",
    ".gallery-text",
    ".gallery-video",
    ".product-card",
    ".checkout-section",
    ".hero-box",
    ".hero-buttons-box",
    ".contact-container",
    ".map-section",
    ".infographic-content",
    ".merch-grid",
    ".products-subtitle",
    ".receipt-panel",
    ".payment-panel"
  ];

  const targets = document.querySelectorAll(selectors.join(","));

  targets.forEach(el => {
    // Don't double-add if HTML already has .reveal on it
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }

    const staggerParents = [
      ".product-grid",
      ".merch-grid",
      ".products"
    ];

    staggerParents.forEach(parent => {

      if (el.closest(parent)) {

        const siblings =
          el.closest(parent).querySelectorAll(":scope > *");

        siblings.forEach((sib, idx) => {
          sib.style.transitionDelay = `${idx * 80}ms`;
        });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -20px 0px"
  });

  targets.forEach(el => observer.observe(el));

})();

/* ── 4. Hero intro animation ─────────────────────────────────── */
(function () {

  const heroContent = document.querySelector(".hero-content, .cta");

  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(28px)";
    heroContent.style.transition =
      "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s";

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      })
    );
  }

  const heroImage = document.querySelector(".hero-image");

  if (heroImage) {
    heroImage.style.opacity = "0";
    heroImage.style.transform = "translateX(-30px)";
    heroImage.style.transition =
      "opacity 0.9s ease 0.05s, transform 0.9s ease 0.05s";

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        heroImage.style.opacity = "1";
        heroImage.style.transform = "translateX(0)";
      })
    );
  }

})();

/* ── 5. PRODUCT PAGE LOGIC ───────────────────────────────────── */
(function () {

  // Only run on product page
  if (!document.querySelector(".products")) return;

  let cart = [];
  let total = 0;

  /* ── Attach cart listeners ────────────────────────────────── */
  function attachCartListeners() {

    document.querySelectorAll(".add-to-cart").forEach(button => {

      // Prevent duplicate listeners
      if (button.dataset.listenerAttached) return;

      button.dataset.listenerAttached = "true";

      button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        cart.push({ name, price });
        total += price;
        updateUI();

      });

    });
  }

  /* ── Update Checkout UI ───────────────────────────────────── */
  function updateUI() {

    const cartList = document.getElementById("cart-items-list");
    const displayTotal = document.getElementById("display-total");
    const hiddenDetails = document.getElementById("order_details");
    const hiddenTotal = document.getElementById("total_price");

    if (!cartList) return;

    if (cart.length === 0) {
      cartList.innerHTML =
        `<p class="empty-msg">Your cart is empty...</p>`;
    } else {
      cartList.innerHTML = cart.map(item => `
        <div class="item-row">
          <span>${item.name}</span>
          <span>₱${item.price}</span>
        </div>
      `).join("");
    }

    if (displayTotal) displayTotal.innerText = `₱${total}`;

    if (hiddenDetails) {
      hiddenDetails.value =
        cart.map(i => `${i.name} (₱${i.price})`).join("\n");
    }

    if (hiddenTotal) hiddenTotal.value = `₱${total}`;
  }

  /* ── Search filter ────────────────────────────────────────── */
  const searchInput = document.querySelector(".search-bar input");

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const val = this.value.toLowerCase();

      document.querySelectorAll(".product-card").forEach(card => {

        const name =
          card.querySelector("h3").textContent.toLowerCase();

        const desc =
          card.querySelector("p").textContent.toLowerCase();

        card.style.display =
          name.includes(val) || desc.includes(val) ? "flex" : "none";

      });

    });

  }

  /* ── EmailJS Checkout ─────────────────────────────────────── */
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (cart.length === 0) {
        alert("Please add coffee to your cart first!");
        return;
      }

      const btn = document.getElementById("submit-btn");

      btn.innerText = "Sending Receipt...";
      btn.disabled = true;

      emailjs.sendForm("service_bje71hi", "template_o3kisqi", this)

        .then(() => {

          alert("☕ Success! Your order receipt has been sent.");

          cart = [];
          total = 0;

          updateUI();
          this.reset();

          btn.innerText = "Place Order & Email Receipt";
          btn.disabled = false;

        })

        .catch((err) => {

          alert(
            "Gmail API Error: " +
            (err.text || "Check your EmailJS Connection")
          );

          btn.innerText = "Place Order & Email Receipt";
          btn.disabled = false;

        });

    });

  }

  /* ── Fetch Products Support ───────────────────────────────── */
  async function loadProducts() {

    const productList = document.getElementById("product-list");

    if (!productList) {
      attachCartListeners();
      return;
    }

    try {

      const response =
        await fetch("http://localhost:3000/api/products");

      const products = await response.json();

      productList.innerHTML = "";

      products.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.img || './img_products/default.png'}"
               alt="${product.name}">
          <div class="product-info">
            <div class="product-header">
              <h3>${product.name}</h3>
              <div class="price">₱${product.price}</div>
            </div>
            <p>${product.desc || ""}</p>
            <button
              class="add-to-cart"
              data-name="${product.name}"
              data-price="${product.price}"
            >
              Add to cart
            </button>
          </div>
        `;

        productList.appendChild(card);

      });

      attachCartListeners();

    } catch (err) {

      console.log("Using static products");
      attachCartListeners();

    }
  }

  loadProducts();

})();