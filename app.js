// Global cart
let cart = [];
let activeCategory = null;

// Spinner toggle
const toggleSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  console.log(spinner);
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
        class="hover:w-36 h-10 hover:bg-green-700 hover:text-white hover:rounded-md">
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
    activeCategory.classList.add("");
  }
  activeCategory = document.getElementById(`btn-${id}`);
  activeCategory.classList.remove("bg-gray-200");
  activeCategory.classList.add("bg-green-700", "text-white");

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    console.log(data);
    displayPlants(data.plants);
  } catch (err) {
    console.error("Category Plants Load Error:", err);
  } finally {
    toggleSpinner(false);
  }
};

// Load and display all plants
const loadPlants = async () => {
  try {
    toggleSpinner(true);
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayPlants(data.plants);
  } catch (err) {
    console.error("Error loading plants:", err);
  } finally {
    toggleSpinner(false);
  }
};

// Limit description words
const limitDescription = (text, wordLimit = 20) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

// Display Plants
const displayPlants = (plants) => {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img class="card-img" src="${plant.image}" alt="${plant.name}">
      <div class="card-description mt-2">
        <h2 onclick="showModal('${plant.id}')" 
         class="card-title cursor-pointer hover:underline font-bold">
          ${plant.name}
        </h2>
        <p class="card-description overflow-hidden text-ellipsis line-clamp-2">
          ${limitDescription(plant.description)}
        </p>
        <div class="flex justify-between items-center mt-2">
          <p class="card-category text-green-700 bg-green-200 rounded-full p-1">
            ${plant.category}
          </p>
          <p class="card-price font-semibold text-green-700">৳${plant.price}</p>
        </div>
      </div>
      <button class="card-button w-full " onclick="addToCart('${plant.id}', '${
      plant.name
    }', ${plant.price})">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
};

// Show Modal
const showModal = async (id) => {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  console.log(id);
  modal.showModal();

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${id}`
    );
    const data = await res.json();
    const plant = data.plants;

    modalContent.innerHTML = `
      <button onclick="closeModal()" class="absolute top-2 right-2  hover:text-red-500">✖</button>
      <img src="${plant.image}" class="w-full h-40 object-cover rounded mb-2" alt="${plant.name}">
      <h2 onclick="showModal('${plant.id}')"
    class="text-xl font-bold mb-2 cursor-pointer hover:text-green-600">
    ${plant.name}</h2>
      <p class="text-gray-700 mb-2">${plant.description}</p>
      <p class="font-semibold">Category: ${plant.category}</p>
      <p class="font-semibold">Price: ৳${plant.price}</p>
    `;
    // modal.classList.remove("hidden");
    // modal.classList.add("flex");
  } catch (err) {
    console.error("Modal Load Error:", err);
  }
};

// Close Modal
const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.add("");
  modal.classList.remove("flex");
};

// Cart Functions
const addToCart = (id, name, price) => {
  cart.push({ id, name, price });
  renderCart();
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
  renderCart();
};

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
      <span>${item.name} - ৳${item.price}</span>
      <button onclick="removeFromCart(${index})" class="text-red-500">❌</button>
    `;
    cartList.appendChild(li);
  });

  cartTotal.innerText = total.toFixed(2);
};

// Init
loadCategories();
loadPlants();
