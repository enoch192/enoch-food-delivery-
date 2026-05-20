const menuItems = [
  {
    id: 1,
    name: "Special Ful",
    price: 80,
    category: "Breakfast",
    img: "https://i.pinimg.com/1200x/cf/6b/8f/cf6b8fae41ec06f662c9f54297f8f365.jpg?w=300",
  },
  {
    id: 2,
    name: "Chechebsa",
    price: 110,
    category: "Breakfast",
    img: "https://i.pinimg.com/736x/db/4d/b6/db4db66d7f0ae6d7b4fbecaf8a5134f0.jpg?w=300",
  },
  {
    id: 3,
    name: "Enkulal Firfir",
    price: 90,
    category: "Breakfast",
    img: "https://i.pinimg.com/1200x/96/c5/84/96c584c30b69db45e9cb8f120ef59986.jpg?w=300",
  },
  {
    id: 4,
    name: "Firfir",
    price: 90,
    category: "Breakfast",
    img: "https://i.pinimg.com/1200x/18/fd/c5/18fdc51ba6b02c63eaa04552615016de.jpg?w=300",
  },
  {
    id: 5,
    name: "Shiro Tagabino",
    price: 95,
    category: "Lunch",
    img: "https://i.pinimg.com/1200x/ff/ab/f6/ffabf62e538e963554e74e527b057c96.jpg?w=300",
  },
  {
    id: 6,
    name: "Mixed Beyaynetu",
    price: 100,
    category: "Lunch",
    img: "https://i.pinimg.com/1200x/a3/78/be/a378bee37a4ee3fac92d209ecb6bb414.jpg?w=300",
  },
  {
    id: 7,
    name: "Pasta",
    price: 80,
    category: "Lunch",
    img: "https://i.pinimg.com/webp70/1200x/74/f5/3c/74f53c3f1036c0ad5be5d2e0f949746b.webp?w=300",
  },
  {
    id: 8,
    name: "Rice",
    price: 80,
    category: "Lunch",
    img: "https://i.pinimg.com/1200x/cc/36/18/cc361857fb4874802160c4c4c3ea3552.jpg?w=300",
  },
  {
    id: 9,
    name: "Mixed Beyaynetu",
    price: 100,
    category: "Dinner",
    img: "https://i.pinimg.com/1200x/a3/78/be/a378bee37a4ee3fac92d209ecb6bb414.jpg?w=300",
  },
  {
    id: 10,
    name: "Misr Wet",
    price: 90,
    category: "Dinner",
    img: "https://i.pinimg.com/1200x/50/0d/2b/500d2b52a2962e5f653ca29797870f3c.jpg?w=300",
  },
  {
    id: 11,
    name: "agelgl",
    price: 150,
    category: "Dinner",
    img: "https://i.pinimg.com/1200x/03/9e/fb/039efbbc2186875af869525a7ff145bb.jpg?w=300",
  },
  {
    id: 12,
    name: "vegetable",
    price: 100,
    category: "Dinner",
    img: "https://i.pinimg.com/736x/81/e7/02/81e7022e52dc242c346e655c21b38ed5.jpg?w=300",
  },
];

let cart = [];

const menuDisplay = document.getElementById("food-menu");
const cartList = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");

// Render Menu
function displayMenu() {
  menuDisplay.innerHTML = "";
  const categories = ["Breakfast", "Lunch", "Dinner"];

  categories.forEach((cat) => {
    const section = document.createElement("div");
    section.classList.add("category-section");
    section.innerHTML = `<h2>${cat}</h2>`;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    const items = menuItems.filter((item) => item.category === cat);
    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("food-card");
      card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>ETB ${item.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    menuDisplay.appendChild(section);
  });
}

function addToCart(id) {
  const product = menuItems.find((item) => item.id === id);
  cart.push({ ...product }); // Push a copy[cite: 4]
  updateUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateUI();
}

function updateUI() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.marginBottom = "5px";
    li.innerHTML = `
            <span>${item.name}</span>
            <span>ETB ${item.price} <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">cancel</button></span>
        `;
    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPriceDisplay.innerText = total.toFixed(2);
  cartCount.innerText = cart.length;
}

// --- BACKEND INTEGRATION ---
async function processCheckout() {
  const paymentMethod = document.getElementById("payment-method").value;
  const phoneNumber = document.getElementById("phone-number").value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Basic phone validation for Ethiopian numbers[cite: 4]
  if (phoneNumber.trim().length < 10) {
    alert("Please enter a valid phone number (e.g., 0911223344).");
    return;
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.innerText = "Connecting to MySQL...";
  checkoutBtn.disabled = true;

  try {
    // Port 5000 matches your app.js[cite: 1, 4]
    const response = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: cart, // Matches req.body.cart
        paymentMethod: paymentMethod, // Matches req.body.paymentMethod
        phoneNumber: phoneNumber, // Matches req.body.phoneNumber
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert(`✅ Success!\n${result.message}\nOrder ID: ${result.order.id}`); // Matches MySQL Order ID
      cart = [];
      updateUI();
    } else {
      alert("❌ Backend Error: " + result.message);
    }
  } catch (error) {
    console.error("Connection Error:", error);
    alert(
      "Could not connect to the backend server. Ensure app.js is running on port 5000.",
    );
  } finally {
    checkoutBtn.innerText = "Pay & Order";
    checkoutBtn.disabled = false;
  }
}

displayMenu();
