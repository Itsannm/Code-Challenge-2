// Get all the vote buttons
const animalList= document.querySelectorAll("animal list")

// Make a GET request to retrieve data of all the animals
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((data) => {
    //Loop through each animal and create a list item element
    data.forEach((animal) => {
      const animalListItem = document.createElement("li");
      animalListItem.innerHTML = `
        <a href="#" data-id="${animal.id}">${animal.name}</a>
      `;
      animalList.appendChild(animalListItem);
    });
  });
  // Select the div element with the id 'animal-details'
  const animalDetails = document.querySelector("#animal-details");

  // Add a click event listener to each vote button
buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Get the vote count for this animal
      const voteCount = button.parentNode.querySelector('.vote-count span');
  
      // Increment the vote count and update the text
      const currentCount = parseInt(voteCount.textContent);
      voteCount.textContent = currentCount + 1;
    });
  });
  
  // Get the results button
  const resultsButton = document.querySelector('#results-button');
  
  // Add a click event listener to the results button
  resultsButton.addEventListener('click', () => {
    // Get all the animal cards
    const cards = document.querySelectorAll('.card');
  
    // Create an array to hold the animals and their vote counts
    const animals = [];
  
    // Iterate over each animal card and get its name and vote count
    cards.forEach((card) => {
      const animal = {};
      animal.name = card.querySelector('.title').textContent;
      animal.votes = parseInt(card.querySelector('.vote-count span').textContent);
      animals.push(animal);
    });
  
    // Sort the animals by vote count in descending order
    animals.sort((a, b) => b.votes - a.votes);
  
    // Create a list of the animals and their vote counts
    let resultsList = '';
    animals.forEach((animal) => {
      resultsList += `<li class="Id">
                        <img class="results-image" src="animal1.jpg" alt="${animal.name}">
                        <div class="results-name">${animal.name}</div>
                        <div class="vote-count">Votes: <span>${animal.votes}</span></div>
                      </li>`;
    });
  
    // Display the results on the page
    const resultsContainer = document.querySelector('#results-container');
    resultsContainer.innerHTML = `<h2 class="results-title">Results</h2>
                                   <div class="results-subtitle">Thanks for voting!</div>
                                   <ul class="results-list">${resultsList}</ul>`;
  });