let namn = document.getElementById("name");
let stats = document.getElementById("stats");
let errors = document.getElementById("error-message");
let type = document.getElementById("type");
let abilities = document.getElementById("abilities");
let button = document.querySelector("button");

button.addEventListener("click", (event) => {
  event.preventDefault();
  let input = document.querySelector("input");
  let value = input.value.toLocaleLowerCase();

  getData(value);
});

async function getData(value) {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    let data = await response.json();
    console.log(data);
    let name = data.name;
    namn.innerHTML = name;

    // Remove existing image if it exists
    let existingImage = document.getElementById("pokemon-image");
    if (existingImage) {
      existingImage.parentNode.removeChild(existingImage);
    }

    let image = document.createElement("img");
    image.id = "pokemon-image";
    let pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.insertBefore(image, pokemonContainer.firstChild);
    image.src = data.sprites.front_default;

    if (data.types.length === 1) {
      type.innerHTML = data.types[0].type.name;
    } else {
      type.innerHTML = data.types.map((type) => type.type.name).join(" ");
    }

    let type1 = data.types[0].type.name;
    let type2 = data.types.length > 1 ? data.types[1].type.name : "";
    type.innerHTML = "Types: " + type1 + " " + type2;

    let ability1 =
      data.abilities.length > 0 ? data.abilities[0].ability.name : "";
    let ability2 =
      data.abilities.length > 1 ? data.abilities[1].ability.name : "";
    abilities.innerHTML = "Abilities: " + ability1 + " " + ability2;

    let hp = data.stats[0].base_stat;
    let attack = data.stats[1].base_stat;
    let defense = data.stats[2].base_stat;
    let specialAttack = data.stats[3].base_stat;
    let specialDefense = data.stats[4].base_stat;
    let speed = data.stats[5].base_stat;
    stats.innerHTML = `HP: ${hp} <br> Attack: ${attack} <br> Defense: ${defense} <br> Special Attack: ${specialAttack} <br> Special Defense: ${specialDefense} <br> Speed: ${speed}`;
  } catch (error) {
    errors.innerHTML = error;
  }
}
