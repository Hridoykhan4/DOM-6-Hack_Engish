const hideElementsById = (allId) => {
  allId.forEach((sId) => {
    document.getElementById(sId).classList.add("hidden");
  });
};

const showElementsById = (allId) => {
  allId.forEach((sId) => {
    document.getElementById(sId).classList.remove("hidden");
  });
};
