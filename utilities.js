const navItems = document.getElementById("nav-items");
let toggleBars = true;
document.getElementById("manage-bars").addEventListener("click", () => {
  if (toggleBars) {
    navItems.classList.remove("hidden");
    navItems.classList.add(
      "absolute",
      "top-17",
      "right-20",
      "block",
      "duration-700",
      "ease-in-out",
      "transition-all",
      "bg-gray-400/20"
    );
    Array.from(navItems.children).map((navItem) => {
      navItem.classList.add("block", "my-3", "cursor-pointer");
    });
    toggleBars = false;
  } else {
    document.getElementById("nav-items").classList.add("hidden");
    toggleBars = true;
  }
});

const loadCategories = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/levels/all`
    );
    const data = await res.json();
    displayCategory(data.data);
  } catch (err) {
    console.log(err);
  }
};

window.onload = loadCategories();
