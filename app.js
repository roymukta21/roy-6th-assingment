// Load Categories
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories"
    );
    const data = await res.json();
    // console.log("API response", data);
    displayCategories(data.categories);
  } catch (err) {
    // console.error("Category Load Error:", err);
  }
};

// Show categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  // console.log(categories);
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="loadCategoryPlants('${category.id}')"
        class="px-12 py-2 hover:bg-green-700 hover:text-white rounded-lg m-2 transition duration-300">
        ${category.category_name}
      </button>
    `;
    categoryContainer.appendChild(div);
  });
};

// Category-wise Plants Load
const loadCategoryPlants = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`
    );
    const data = await res.json();
    console.log("Plants in this Category:", data);
  } catch (err) {
    console.error("Category Plants Load Error:", err);
  }
};

// Call function
loadCategories();
