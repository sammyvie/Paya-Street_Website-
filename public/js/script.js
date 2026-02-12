let cart = [];
let total = 0;

// Add to Cart Logic
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        
        cart.push({ name, price });
        total += price;
        
        updateUI();
    });
});

function updateUI() {
    const cartList = document.getElementById("cart-items");
    const displayTotal = document.getElementById("display-total");
    
    // Hidden inputs for EmailJS
    const hiddenDetails = document.getElementById("order_details");
    const hiddenTotal = document.getElementById("total_price");

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-msg">No items added yet.</p>';
    } else {
        // Build the HTML list for the screen
        cartList.innerHTML = cart.map(item => `
            <div class="item-row">
                <span>${item.name}</span>
                <span>₱${item.price}</span>
            </div>
        `).join("");
    }

    displayTotal.innerText = `₱${total}`;

    // Format the text for the email receipt
    hiddenDetails.value = cart.map(i => `${i.name} (₱${i.price})`).join(", ");
    hiddenTotal.value = `₱${total}`;
}

// Order Submission
document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Change button state
    const btn = document.querySelector(".place-order-btn");
    btn.innerText = "Sending Receipt...";
    btn.disabled = true;

    // Use your specific Service ID and Template ID from EmailJS
    emailjs.sendForm("service_bje71hi", "template_o3kisqi", this)
    .then(() => {
        alert("Success! Order sent and receipt emailed.");
        cart = [];
        total = 0;
        updateUI();
        this.reset();
        btn.innerText = "Confirm Order";
        btn.disabled = false;
    }, (err) => {
        alert("Email Service Error: " + JSON.stringify(err));
        btn.innerText = "Confirm Order";
        btn.disabled = false;
    });
});