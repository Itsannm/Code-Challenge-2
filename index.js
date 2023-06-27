// Make a GET request to retrieve data of all the animals
fetch("http://localhost:3000/characters")
  .then((response) => response.json())
  .then((characters) => {
    const animalList = document.getElementById("animal-list");
    
    characters.forEach((character) => {
      const animalItem = document.createElement('div');
      animalItem.classList.add('animal-item');
      animalItem.textContent = character.name;
      animalItem.addEventListener('click', () => showAnimalDetails(character.id));
      animalList.appendChild(animalItem);
    });
  });

// Fetch and display animal details
function showAnimalDetails(animalId) {
  fetch(`http://localhost:3000/characters/${animalId}`)
    .then(response => response.json())
    .then(character => {
      const animalDetails = document.getElementById('animal-details');
      animalDetails.innerHTML = '';

      const animalImage = document.createElement('img');
      animalImage.src = character.image;
      animalImage.classList.add('animal-image');
      animalDetails.appendChild(animalImage);

      const votesCount = document.createElement('div');
      votesCount.textContent = `Votes: ${character.votes}`;
      votesCount.classList.add('votes');
      animalDetails.appendChild(votesCount);

      const voteButton = document.createElement('button');
      voteButton.textContent = 'Vote';
      voteButton.addEventListener('click', () => {
        character.votes++;
        votesCount.textContent = `Votes: ${character.votes}`;
      });
      animalDetails.appendChild(voteButton);
    });
}
