async function fetchCardsData(countCards = 12) {
    const cards = [];
    
    // generete random IDs to fetch from api
    const randomIDs = new Set();
    while (randomIDs.size < countCards)
        randomIDs.add(Math.floor(Math.random() * 150) + 1);

    for (const id of randomIDs) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        cards.push({
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.other['official-artwork'].front_default,
        });
    }

    return cards;
}

export default fetchCardsData;