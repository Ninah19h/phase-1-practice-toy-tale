let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyForm = document.querySelector(".add-toy-form");
const toyCollection = document.getElementById("toy-collection");

// 1. Load all toys on page load
fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => {
    toys.forEach(toyCard);
  });

//add new toy when form is submitted
toyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then(res => res.json())
    .then(toy => {
      toyCard(toy);
      toyForm.reset();
    });
});

//to display a toy card
function toyCard(toy) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  const likeBtn = card.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    handleLike(toy, card);
  });

  toyCollection.appendChild(card);
}

// for clicks
function handleLike(toy, card) {
  const newLikes = toy.likes + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: newLikes })
  })
    .then(res => res.json())
    .then(updatedToy => {
      toy.likes = updatedToy.likes;
      card.querySelector("p").textContent = `${updatedToy.likes} Likes`;
    });
}

});
