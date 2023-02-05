export function compareTrophies(user1Trophies, user2Trophies) {
    const matchingTrophies = [];
    user1Trophies.forEach(user1Trophy => {
        user2Trophies.forEach(user2Trophy => {
            if (user1Trophy.name === user2Trophy.name) {
                matchingTrophies.push(user1Trophy);
            }
        });
    });
    return matchingTrophies;
}
