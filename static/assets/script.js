const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    })
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    })
}

const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart-new');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-new-active')
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-new-active')
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove = Array.from(btnRemove);
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements = Array.from(qtyElements);
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    let cartBtns = document.querySelectorAll('#add-cart');
    cartBtns = Array.from(cartBtns);
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addcart);
    });
}

function removeItem() {
    if (confirm('Are you sure you want to remove this item?')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title !== title);
        this.parentElement.remove();
        loadContent();
        updateTotal();
        localStorage.setItem('cartItems', JSON.stringify(itemList));
        updateCartCount(document.querySelector(".cart-count"));
    }
}

function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
    updateTotal();
}

let itemList = [];

function addcart() {
    let cartIcon = this;
    let food = cartIcon.closest('.pro');
    let title = food.querySelector(".food-title").innerHTML;
    let price = food.querySelector(".food-price").innerHTML;
    let imgSrc = food.querySelector(".food-img").src;
    let newProduct = { title, price, imgSrc };
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product already exists in the cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector(".cart-content");
    cartBasket.append(element);
    loadContent();
    localStorage.setItem('cartItems', JSON.stringify(itemList));
    updateCartCount(document.querySelector(".cart-count"));
    updateTotal();
}

function createCartProduct(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove" id="cart-remove"></i>
        </div>
    `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let qty = product.querySelector(".cart-quantity").value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "$" + price * qty;
    });

    totalValue.innerHTML = '$' + total;

    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;
}

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector(".cart-count");
    loadCartFromStorage();
    updateCartCount(cartCount);
});

function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    const storedItems = localStorage.getItem('cartItems');
    let count = 0;
    if (storedItems) {
        count = JSON.parse(storedItems).length;
    }
    cartCount.innerHTML = count;

    if (count === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
    loadContent();
    updateTotal();
}

function loadCartFromStorage() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        itemList = JSON.parse(storedItems);
        const cartCountOnIndex = document.querySelector(".cart-count");
        if (cartCountOnIndex) {
            updateCartCount(cartCountOnIndex);
        }
        renderCartItems();
    }
    loadContent();
    updateTotal();
}

function renderCartItems() {
    const cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = '';
    itemList.forEach(item => {
        const cartItemElement = createCartProduct(item.title, item.price, item.imgSrc);
        cartContent.insertAdjacentHTML('beforeend', cartItemElement);
    });
    loadContent();
    updateTotal();
}

document.addEventListener('DOMContentLoaded', function() {
    setupPayPalButton();
});

function setupPayPalButton() {
    const paypalButton = document.getElementById('paypal-button');

    paypal.Buttons({
        createOrder: function(data, actions) {
            // Calculate total amount based on cart items
            const cartItems = document.querySelectorAll('.cart-box');
            let total = 0;
            cartItems.forEach(product => {
                let priceElement = product.querySelector('.cart-price');
                let price = parseFloat(priceElement.innerHTML.replace("$", ""));
                let qty = product.querySelector(".cart-quantity").value;
                total += (price * qty);
            });
    
            // Create the order with the calculated total amount
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2) // Ensure total is formatted as a valid number with 2 decimal places
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            // Display an alert when payment is successful
            alert('Order placed successfully!');
        }
        // Rest of your PayPal button configuration
    }).render(paypalButton);
}

function addcart() {
    let cartIcon = this;
    let productDetails = cartIcon.closest('#prodetails'); // Get the closest container of product details
    let title = productDetails.querySelector(".food-title").innerHTML; // Get the title
    let price = productDetails.querySelector("h2").innerHTML; // Get the price
    let imgSrc = productDetails.querySelector(".food-img").src; // Get the image source
    let newProduct = { title, price, imgSrc };
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product already exists in the cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector(".cart-content");
    cartBasket.append(element);
    loadContent();
    localStorage.setItem('cartItems', JSON.stringify(itemList));
    updateCartCount(document.querySelector(".cart-count"));
    updateTotal();
}


