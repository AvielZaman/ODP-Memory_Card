import '../styles/card.css'

function Card({card, onClick}){
    return(
        <div className='card' onClick={()=> onClick(card.id)}>
            <div className='img-container'>
                <img src={card.imageUrl} alt={card.name}/>
            </div>
            <h3 className='card-name'> {card.name}</h3>
        </div>
    );
}

export default Card;