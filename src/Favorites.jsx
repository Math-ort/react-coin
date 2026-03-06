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
        return  <h1>no hay criptomonedas favoritas</h1>
    }
    return (
        <div>
            <h1> Criptomonedas favoritas </h1>
            {coins.map(coin => (
                <div key={coin.id}>
                    <Link to={`/coin/${coin.id}`}>
                        {coin.name}
                    </Link>
                </div>


            ))}
        </div>
    );
}


export default Favorites