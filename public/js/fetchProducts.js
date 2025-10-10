const productList = document.getElementById("product-list");

async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${product.img || './img_products/default.png'}" alt="${product.name}">
                <div class="product-info">
                    <div class="product-header">
                        <h3>${product.name}</h3>
                        <div class="price">₱${product.price}</div>
                    </div>
                    <p>${product.desc || ''}</p>
                    <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to cart</button>
                </div>
            `;
            productList.appendChild(card);
        });

        // Attach add-to-cart listeners
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                const price = button.getAttribute("data-price");
                cart.push(`${name} - ₱${price}`);
                document.getElementById("order_details").value = cart.join("\n");
            });
        });

    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

loadProducts();
