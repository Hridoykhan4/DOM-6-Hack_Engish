const navItems = document.getElementById("nav-items");
const spinner = document.getElementById("spinner");
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
    navItems.classList.remove(
      "absolute",
      "top-17",
      "right-20",
      "block",
      "duration-700",
      "ease-in-out",
      "transition-all",
      "bg-gray-400/20"
    );
    toggleBars = true;
  }
});

const loadCategories = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/levels/all`
    );
    const data = await res.json();
    setTimeout(() => {
      displayCategory(data.data);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

window.onload = loadCategories();

hideElementsById(["faq", "lesson-container", "vocabulary", "main-header"]);

// Login
const handleLogin = () => {
  const userName = document.getElementById("username");
  if (!userName.value.trim()) {
    return alert("Please Fill Your Name");
  }
  const pass = document.getElementById("password");
  if (pass.value === "123456") {
    hideElementsById(["hero-section"]);
    showElementsById(["faq", "lesson-container", "vocabulary", "main-header"]);
    window.scrollTo(0, 0);
  }

  userName.value = "";
  pass.value = "";
};

// LogOut
const logout = () => {
  hideElementsById(["main-header", "vocabulary", "faq"]);
  showElementsById(["hero-section", "footer"]);
  window.scrollTo(0, 0);
};
