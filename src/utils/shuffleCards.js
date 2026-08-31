function shuffleCards(cardsArray) {
    const newArr = [...cardsArray];
    let currentIndex = newArr.length;

    while (currentIndex !== 0) {
        // choosing random index
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // swap elements
        [newArr[currentIndex], newArr[randomIndex]] = 
        [newArr[randomIndex], newArr[currentIndex]];
    }
    return newArr;
}

export default shuffleCards;