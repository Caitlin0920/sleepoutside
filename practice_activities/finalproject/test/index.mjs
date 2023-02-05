// import { searchUser } from './search.mjs';
// import { displayTrophies, displayMatchingTrophies } from './display.mjs';
// import { compareTrophies } from './compare.mjs';

// const user1Input = document.getElementById("user1Input");
// const user1SearchBtn = document.getElementById("user1SearchBtn");
// const user2Input = document.getElementById("user2Input");
// const user2SearchBtn = document.getElementById("user2SearchBtn");

// user1SearchBtn.addEventListener("click", async () => {
//     const user1Id = user1Input.value;
//     const user1Trophies = await searchUser(user1Id);
//     displayTrophies(user1Trophies, 1);
// });

// user2SearchBtn.addEventListener("click", async () => {
//     const user2Id = user2Input.value;
//     const user2Trophies = await searchUser(user2Id);
//     displayTrophies(user2Trophies, 2);
// });

// user1SearchBtn.addEventListener("click", async () => {
//     const user1Id = user1Input.value;
//     const user1Trophies = await searchUser(user1Id);
//     const user2Id = user2Input.value;
//     const user2Trophies = await searchUser(user2Id);
//     const matchingTrophies = compareTrophies(user1Trophies, user2Trophies);
//     displayMatchingTrophies(matchingTrophies);
// });

import { searchUser } from './search.mjs';
import { displayTrophies, displayMatchingTrophies } from './display.mjs';
import { compareTrophies } from './compare.mjs';

const user1Input = document.getElementById("user1Input");
const user2Input = document.getElementById("user2Input");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
    const user1Id = user1Input.value;
    const user1Trophies = await searchUser(user1Id);
    displayTrophies(user1Trophies, 1);

    const user2Id = user2Input.value;
    const user2Trophies = await searchUser(user2Id);
    displayTrophies(user2Trophies, 2);

    const matchingTrophies = compareTrophies(user1Trophies, user2Trophies);
    displayMatchingTrophies(matchingTrophies);
});



