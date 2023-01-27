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
  // addEventListener("select", pokemon.name) = getresults.results.url;
  // document.addEventListener("select", pokemonselection);

  // function pokemonselection() {
  //     document.getElementById("div").innerHTML = `<a>${pokemon.url}</a>`;
  // }
}

getPokemon(url);
console.log("second", getresults);

// Here’s an example of how to get selected values from a multi-select:

// <select id="select" multiple>
//   <option value="blues" selected>Blues</option>
//   <option value="rock" selected>Rock</option>
//   <option value="classic">Classic</option>
// </select>

// <script>
//   // get all selected values from multi-select
//   let selected = Array.from(select.options)
//     .filter(option => option.selected)
//     .map(option => option.value);

//   alert(selected); // blues,rock
// </script>

// <a class="wes" href="https://wesbos.com">Wes Bos</a>

// n the JS file, select the link and then listen for a click on it, like so 👇

// const wes = document.querySelector(".wes");
// wes.addEventListener("click", function(event) {
//   console.log(event);
// });
// When you click the link, you will see the event in the console for a split second before you are redirected to the next page.
