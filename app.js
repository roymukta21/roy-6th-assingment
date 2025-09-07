// Global cart array
let cart = [];

// ✅ Load Categories
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

// ✅ Display Categories
const displayCategories = (categories) => {
  const container = document.getElementById("category-container");
  container.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.innerText = cat.category;
    btn.className =
      "btn btn-outline w-full text-left justify-start hover:bg-green-200";
    btn.onclick = () => {
      setActiveCategory(btn);
      loadPlantsByCategory(cat.category_id);
    };
    container.appendChild(btn);
  });
};

// ✅ Active Button State
const setActiveCategory = (activeBtn) => {
  const buttons = document.querySelectorAll("#category-container button");
  buttons.forEach((btn) => btn.classList.remove("bg-green-300"));
  activeBtn.classList.add("bg-green-300");
};

// ✅ Load Plants by Category
const loadPlantsByCategory = async (id) => {
  toggleSpinner(true);
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    displayPlants(data.data);
  } catch (err) {
    console.error("Plant Load Error:", err);
  } finally {
    toggleSpinner(false);
  }
};

// ✅ Display Plants
const displayPlants = (plants) => {
  const container = document.getElementById("plants-container");
  container.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className =
      "card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition";
    card.innerHTML = `
        <img src="${plant.image}" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="font-bold text-lg cursor-pointer text-green-700 hover:underline"
              onclick="loadPlantDetails(${plant.plantId})">${plant.plantName}</h3>
          <p class="text-sm text-gray-600 mt-1">${plant.shortDescription}</p>
          <p class="mt-2"><span class="badge badge-outline">${plant.category}</span></p>
          <p class="font-semibold mt-2">৳${plant.price}</p>
          <button class="btn btn-sm bg-green-600 text-white mt-3"
                  onclick="addToCart('${plant.plantId}', '${plant.plantName}', ${plant.price})">Add to Cart</button>
        </div>
      `;
    container.appendChild(card);
  });
};

// ✅ Load Plant Details (for Modal)
const loadPlantDetails = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${id}`
    );
    const data = await res.json();
    showModal(data);
  } catch (err) {
    console.error("Modal Load Error:", err);
  }
};

// ✅ Show Modal
const showModal = (plant) => {
  document.getElementById("modal-title").innerText = plant.plantName;
  document.getElementById("modal-image").src = plant.image;
  document.getElementById("modal-description").innerText =
    plant.longDescription || "No description available.";
  document.getElementById("modal-category").innerText = plant.category;
  document.getElementById("modal-price").innerText = `৳${plant.price}`;

  document.getElementById("plant-modal").checked = true;
};

// ✅ Add to Cart
const addToCart = (id, name, price) => {
  const item = { id, name, price };
  cart.push(item);
  updateCartUI();
};

// ✅ Remove from Cart
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
};

// ✅ Update Cart UI
const updateCartUI = () => {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");
  list.innerHTML = "";

  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-white p-2 rounded shadow";
    li.innerHTML = `
        <span>${item.name}</span>
        <button class="text-red-500" onclick="removeFromCart('${item.id}')">❌</button>
      `;
    list.appendChild(li);
  });

  totalEl.innerText = total;
};

// ✅ Spinner Toggle
const toggleSpinner = (show) => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.toggle("hidden", !show);
};

// Load Categories Initially
loadCategories();
