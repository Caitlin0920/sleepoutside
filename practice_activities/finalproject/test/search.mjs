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

function search() {
    const user1 = document.getElementById("user1Input").value;
    const user2 = document.getElementById("user2Input").value;
    fetch(${ API_URL } / ${ user1 }, ${ user2 })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // do something with the data
        });
}
document.getElementById("searchBtn").addEventListener("click", search);

