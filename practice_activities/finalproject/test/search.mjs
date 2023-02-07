// import API_URL from "./trophies.mjs";

// export async function searchUser(id) {
//     const response = await fetch(`${API_URL}/${id}`);
//     const data = await response.json();
//     return data;
// }
// console.log(data);


// function search() {
//     const user1 = document.getElementById("user1Input").value;
//     const user2 = document.getElementById("user2Input").value;
//     const API_URL = ` https://m.np.playstation.com/api/trophy`;

//     fetch(API_URL.replace("{me}", user1 + "," + user2))
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // do something with the data
//         });
// }
// document.getElementById("searchBtn").addEventListener("click", search);

import API_URL from "./trophies.mjs";

export async function searchUser(id) {
    const response = await fetch(${ API_URL } / ${ id });
    const data = await response.json();
    return data;
}

async function search() {
    const user1 = document.getElementById("user1Input").value;
    const user2 = document.getElementById("user2Input").value;
    const response = await fetch(`http://localhost:3000/searchUser/${user1}/${user2}`);
    const data = await response.json();
    console.log(data);
    // do something with the data
}

// function search() {
//     const user1 = document.getElementById("user1Input").value;
//     const user2 = document.getElementById("user2Input").value;
//     fetch(${ API_URL } / ${ user1 }, ${ user2 })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // do something with the data
//         });
// }
document.getElementById("searchBtn").addEventListener("click", search);

// You can now obtain an authentication token using your NPSSO with the following function calls from this package.
// This is the value you copied from the previous step.
const myNpsso = "dRuhIKvCbzh9RZDhSOespLitsKO9ethaJ0gD2JwHswyEKxgdUFWeRN8yP1XveJ9m";

// We'll exchange your NPSSO for a special access code.
const accessCode = await exchangeNpssoForCode(npsso);

// 🚀 We can use the access code to get your access token and refresh token.
const authorization = await exchangeCodeForAccessToken(accessCode);
//You now have all you need to use any function in the API. Each function takes this authorization object as its first argument. To be more precise, the functions are looking for your accessToken value. Here's an example:
// This returns a list of all the games you've earned trophies for.
const trophyTitlesResponse = await getUserTitles(
    { accessToken: authorization.accessToken },
    "me"
);

