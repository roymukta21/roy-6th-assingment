// Global cart
let cart = [];
// let activeCategory = null;

// Spinner toggle
const toggleSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("hidden", !show);
};

// Load Categories
const loadCategories = async () => {
  toggleSpinner(true);
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    displayCategories(data.categories);
  } catch (err) {
    console.error("Category Load Error:", err);
  } finally {
    toggleSpinner(false);
  }
};

// Show categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="btn-${category.id}"
        onclick="loadCategoryPlants('${category.id}')"
        class="hover:w-36 h-10 hover:bg-green-700 hover:text-white rounded-lg m-2 transition duration-300 whitespace-nowrap">
        ${category.category_name}
      </button>
    `;
    categoryContainer.appendChild(div);
  });
};

// Category-wise Plants Load
const loadCategoryPlants = async (id) => {
  toggleSpinner(true);

  // Active button state
  if (activeCategory) {
    activeCategory.classList.remove("bg-green-700", "text-white");
    activeCategory.classList.add("bg-gray-200");
  }
  activeCategory = document.getElementById(`btn-${id}`);
  activeCategory.classList.remove("bg-gray-200");
  activeCategory.classList.add("bg-green-700", "text-white");

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    displayPlants(data.data);
  } catch (err) {
    console.error("Category Plants Load Error:", err);
  } finally {
    toggleSpinner(false);
  }
};

// Display Plants in cards
const loadPlants = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    const plants = data.plants;
    displayPlants(plants);
  } catch (err) {
    console.error("Error loading plants:", err);
  }
};

const displayPlants = (plants) => {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
          <img class="card-img" src="${plant.image}" alt="${plant.name}">
          <h2 class="card-title">${plant.name}</h2>
          <button class="card-button">Add to Cart</button>
        `;
    container.appendChild(card);
  });
};

// Call function
loadPlants();

// Show Modal with details
const showModal = async (id) => {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${id}`
    );
    const data = await res.json();
    const plant = data;

    modalContent.innerHTML = `
      <img src="${plant.image}" class="w-full h-40 object-cover rounded mb-2" alt="${plant.name}">
      <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
      <p class="text-gray-700 mb-1">${plant.description}</p>
      <p class="font-semibold">Category: ${plant.category}</p>
      <p class="font-semibold">Price: $${plant.price}</p>
    `;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  } catch (err) {
    console.error("Modal Load Error:", err);
  }
};

// Close Modal
const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

// Add to Cart
const addToCart = (id, name, price) => {
  cart.push({ id, name, price });
  renderCart();
};

// Remove from Cart
const removeFromCart = (index) => {
  cart.splice(index, 1);
  renderCart();
};

// Render Cart items
const renderCart = () => {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b pb-1";
    li.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})" class="text-red-500">❌</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.innerText = total.toFixed(2);
};

// Init
loadCategories();
