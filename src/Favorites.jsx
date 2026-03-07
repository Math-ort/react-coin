import { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

function Favorites () {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    async function getCoins() {
        const response = await fetch("https://rest.coincap.io/v3/assets");
        const data = await response.json();

        const favoriteCoins = data.data.filter(coin =>
            favorites.includes(coin.id)
            );
            setCoins(favoriteCoins);
    }
    getCoins();
    }, []);
    if (coins.length === 0) {
        return  <h1 className="empty">no hay criptomonedas favoritas</h1>
    }
    return (
        <div className="page">
            <h1 className="title"> Criptomonedas favoritas </h1>
            <div className="grid">
            {coins.map(coin => (
                    <Link 
                        to={`/coin/${coin.id}`}
                        key={coin.id}
                        className="favorite-card">

                        <h2>{coin.name}</h2>
                        <p>{coin.symbol}</p>
                        <span>Rank #{coin.rank}</span>
                    </Link>
                ))}
                </div>


        </div>
    );
}


export default Favorites