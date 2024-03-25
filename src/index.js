let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function loadToys() {
  fetch('http://localhost:3000/toys') 
    .then(response => response.json())
    .then(data => {
      const toyCollection = document.querySelector("#toy-collection");

      
      data.forEach(toy => {
        const toyCard = document.createElement("div");
        toyCard.classList.add("card");

        const toyName = document.createElement("h2");
        toyName.textContent = toy.name;
        toyCard.appendChild(toyName);

        const toyImage = document.createElement("img");
        toyImage.src = toy.image;
        toyImage.classList.add("toy-avatar");
        toyCard.appendChild(toyImage);

        const likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        toyCard.appendChild(likeButton);

        
        likeButton.addEventListener("click", () => {
          const newNumberOfLikes = toy.likes + 1;
          updateToyLikes(toy.id, newNumberOfLikes, toyCard);
        });

       
        toyCollection.appendChild(toyCard);
      });
    })
    .catch(error => console.log(error));
}

function updateToyLikes(toyId, newNumberOfLikes, toyCard) {
  const url = `http://localhost:3000/toys/${toyId}`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  const body = JSON.stringify({
    likes: newNumberOfLikes
  });

  fetch(url, {
    method: "PATCH",
    headers: headers,
    body: body
  })
    .then(response => response.json())
    .then(data => {
      
      toyCard.querySelector("h2").textContent = data.name;
      toyCard.querySelector("img").src = data.image;
      
      toyCard.querySelector("button").textContent = `Like (${data.likes})`;
    })
    .catch(error => console.log(error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadToys();
});