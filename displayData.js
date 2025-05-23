const lessonContainer = document.getElementById(`lesson-container`);
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `btn btn-active`;
    button.setAttribute("id", `btn-${category.level_no}`);
    button.textContent = `${category.lessonName}`;
    button.onclick = () => {
      showCategoryWords(category?.level_no);
      lessonContainer.innerHTML = ``;
    };
    categoryContainer.appendChild(button);
  });
};

const defaultText = document.getElementById(`default-text`);

const hideAllBgColors = () => {
  const active = document.querySelectorAll(".btn-active");
  active.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
};

const showCategoryWords = (id) => {
  hideAllBgColors();
  document.getElementById(`btn-${id}`).classList.add("btn-primary");
  spinner.classList.remove("hidden");
  setTimeout(() => {}, 2000);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length <= 0) {
        lessonContainer.classList.remove("grid");
        lessonContainer.innerHTML = `<div class="w-full p-4 flex flex-col items-center justify-center text-center bg-yellow-50 border border-yellow-300 rounded-xl shadow-md">
  <i class="ri-error-warning-line text-yellow-500 text-4xl mb-2"></i>
  <h2 class="text-lg font-semibold text-yellow-700">এই Lesson এ এখনও Vocabulary যুক্ত করা হয় নি।</h2>
  <p class="text-sm text-yellow-600 mt-1">নেক্সট Lesson এ যান।</p>
</div>`;
      } else {
        lessonContainer.classList.add("grid");
      }
      data.data.forEach((word) => {
        if (word) {
          defaultText?.classList?.add("hidden");
          const div = document.createElement("div");
          div.className = `rounded-lg shadow-sm bg-white p-5`;
          div.innerHTML = `
    <div>
             <div class="text-center space-y-1">
                <h3 class="font-semibold text-lg">
                    ${word?.word}
                </h3>
                 <p class="text-sm text-gray-600">
                    Meaning / Pronunciation
                 </p>
                  <p>
                    ${word?.meaning || word?.word}
                 </p>
             </div>  

    <div class="flex items-center justify-between px-4 mt-3 bg-white shadow-md rounded-lg p-4">

            <div onclick="showWordDetail('${
              word?.id
            }')" class="bg-blue-100 text-blue-600 rounded-full p-3">
            <i class="ri-information-line text-2xl"></i>
            </div>
            
            <div class="curso" onclick="pronounceWord('${
              word?.word
            }')" class="!cursor-pointer">
            <button class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <i class="ri-volume-up-line cursor-pointer text-2xl"></i>
            </button>
            </div>
    </div>
</div>
          `;
          lessonContainer.appendChild(div);
        }
      });
      spinner.classList.add("hidden");
    });
};

const showWordDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => showDetailsInModal(data.data));
};

const showDetailsInModal = (word) => {
  my_modal_5.showModal();
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
         <h3 class="text-lg font-bold">${word?.word}</h3>
        <p class="font-semibold">Meaning</p>
       <p class="text-gray-600 font-medium">${
         word?.meaning || word?.pronunciation
       }</p>


        <div class="mt-2">
                   <p class="font-semibold">Example</p>
        <p class="text-gray-600 font-medium">${word?.sentence || "Not Found"}<p>
        </div>

          <div class="mt-2">
                   <p class="font-semibold">সমার্থক শব্দ গুলো</p>
                    ${
                      word?.synonyms?.length > 0
                        ? `<ul class="list-disc ml-5">
                            ${word.synonyms
                              .map((s) => `<li>${s}</li>`)
                              .join("")}
                        <ul>`
                        : "No Synonyms Found"
                    }
        </div>
    `;
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}
/*{
    "word": "Cautious",
    "meaning": "সতর্ক",
    "pronunciation": "কশাস",
    "level": 2,
    "sentence": "Be cautious while crossing the road.",
    "points": 2,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "careful",
        "alert",
        "watchful"
    ],
    "id": 3
}*/
