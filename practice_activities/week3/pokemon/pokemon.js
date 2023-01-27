const url = "https://pokeapi.co/api/v2/pokemon/";

let getresults = null;
async function getPokemon(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    dostuff(data);
  }
}
function dostuff(data) {
  getresults = data;
  console.log("first:", getresults);
  pokemonDropDown.innerHTML = `<select><option>Choose a Pokemon</option>`;

  getresults.results.forEach((pokemon) => {
    pokemonDropDown.innerHTML += `<option value="${pokemon.name}">${pokemon.name}</option>`;
    // console.log("third", pokemon.name)
  });
  pokemonDropDown.innerHTML += `</select>`;

}

getPokemon(url);
console.log("second", getresults);

