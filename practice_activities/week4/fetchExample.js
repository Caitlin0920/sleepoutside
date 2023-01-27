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
    fetchResults.innerHTML = `<h1>These are some Pokemon</h1><ol>`;

    getresults.results.forEach((pokemon) => {
        fetchResults.innerHTML += `<li>${pokemon.name}</li>`
        // fetchResults.innerHTML += <li>${pokemon.name}</li>
        // fetchResults.innerHTML += </ol>;
        // console.log("third", pokemon.name)
        fetchResults.innerHTML += `</ol>`

    });
    // getResults.count(pokemon) {
    //     fetchResults.innerHTML += `<p>There is ${pokemon.count}Pokemon from this API</p>`;
    // }

}

getPokemon(url);
console.log("second", getresults);



