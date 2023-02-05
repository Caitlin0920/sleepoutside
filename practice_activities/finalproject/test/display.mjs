// export function displayTrophies(trophies, user) {
//     const dataDiv = user === 1 ? document.getElementById("user1Data") : document.getElementById("user2Data");
//     dataDiv.innerHTML = "";
//     trophies.forEach(trophy => {
//         const trophyDiv = document.createElement("div");
//         trophyDiv.innerHTML = `
//       <h3>${trophy.name}</h3>
//       <p>${trophy.description}</p>
//     `;
//         dataDiv.appendChild(trophyDiv);
//     });
// }

// export function displayMatchingTrophies(trophies) {
//     const matchingDataDiv = document.getElementById("matchingData");
//     matchingDataDiv.innerHTML = "";
//     trophies.forEach(trophy => {
//         const trophyDiv = document.createElement("div");
//         trophyDiv.innerHTML = `<h3>${trophy.name}</h3> <p>${trophy.description}</p>`;
//         matchingDataDiv.appendChild(trophyDiv);
//     });
// }

export function displayTrophies(trophies, user) {
    const dataDiv = user === 1 ? document.getElementById("user1Data") : document.getElementById("user2Data");
    dataDiv.innerHTML = "";
    trophies.forEach(trophy => {
        const trophyDiv = document.createElement("div");
        trophyDiv.innerHTML = `
      <h3>${trophy.name}</h3>
      <p>${trophy.description}</p>
    `;
        dataDiv.appendChild(trophyDiv);
    });
}

export function displayMatchingTrophies(trophies) {
    const matchingDataDiv = document.getElementById("matchingData");
    matchingDataDiv.innerHTML = "";
    trophies.forEach(trophy => {
        const trophyDiv = document.createElement("div");
        trophyDiv.innerHTML = `<h3>${trophy.name}</h3> <p>${trophy.description}</p>`;
        matchingDataDiv.appendChild(trophyDiv);
    });
}
