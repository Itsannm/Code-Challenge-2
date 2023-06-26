const animalList = document.querySelector("#animal-list");
const animalDetails = document.querySelector("#animal-details");

//make GET request to retrieve data of all the animals
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((data) => {
    data.characters.forEach((animal) => {
      const animalListItem = document.createElement("li");
      const animalNameLink = document.createElement("a");
      animalNameLink.href = "#";
      animalNameLink.dataset.id = animal.id;
      animalNameLink.textContent = animal.name;

      animalNameLink.addEventListener("click", () => {
        displayAnimalDetails(animal);
      });

      animalListItem.appendChild(animalNameLink);
      animalList.appendChild(animalListItem);
    });
  });

function displayAnimalDetails(animal) {
  animalDetails.innerHTML = `
    <h2>${animal.name}</h2>
    <img src="${animal.image}" alt="${animal.name}">
    <div>Votes: <span id="vote-count-${animal.id}">${animal.votes}</span></div>
    <button id="vote-button-${animal.id}">Vote</button>
  `;

  const voteButton = document.querySelector(`#vote-button-${animal.id}`);
  const voteCount = document.querySelector(`#vote-count-${animal.id}`);

  voteButton.addEventListener("click", () => {
    animal.votes++;
    voteCount.textContent = animal.votes;
  });
}

// Get the results button
const resultsButton = document.querySelector("#results-button");

// Add a click event listener to the results button
resultsButton.addEventListener("click", () => {
  // Get all the animal cards
  const cards = document.querySelectorAll(".card");

  // Create an array to hold the animals and their vote counts
  const animals = [];

  // Iterate over each animal card and get its name and vote count
  cards.forEach((card) => {
    const animal = {};
    animal.name = card.querySelector(".title").textContent;
    animal.votes = parseInt(card.querySelector(".vote-count span").textContent);
    animals.push(animal);
  });

  // Sort the animals by vote count in descending order
  animals.sort((a, b) => b.votes - a.votes);

  // Create a list of the animals and their vote counts
  let resultsList = "";
  animals.forEach((animal) => {
    resultsList += `<li class="Id">
                      <img class="results-image" src="animal1.jpg" alt="${animal.name}">
                      <div class="results-name">${animal.name}</div>
                      <div class="vote-count">Votes: <span>${animal.votes}</span></div>
                    </li>`;
  });

  // Display the results on the page
  const resultsContainer = document.querySelector("#results-container");
  resultsContainer.innerHTML = `<h2 class="results-title">Results</h2>
                                 <div class="results-subtitle">Thanks for voting!</div>
                                 <ul class="results-list">${resultsList}</ul>`;
});
