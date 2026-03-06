import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './App.css';

function Coin () {
    const {id} = useParams();
    const [coin, setCoin] = useState({});
    const [isFavorite, setIsFavorite] =useState(false);

    useEffect(() => {
         async function getCoin() {
                try {
                    const response = await fetch(`https://rest.coincap.io/v3/assets/${id}`);
                    if(!response.ok) {
                        throw new Error (`La solicitud no fue exitosa: ${response.status}`);
                    }
                    const data = (await response.json());
                    console.log(data.data)              
                    setCoin(data.data);
                    //comprobar si una coin esta en favoritos 
                    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                    if(favorites.includes(id)) {
                        setIsFavorite(true);
                    }
                } catch (error) {
                    console.log(error + 'Error: no se pudo obtener la criptomoneda.');
                }         
            }
            getCoin()
    },
    [id])

    function addFavorite() {
        let favorites;
        try {
            const stored = localStorage.getItem("favorites");
            favorites = stored ? JSON.parse(stored) : [];
            if (!Array.isArray(favorites)) {
                favorites = [];
            }
        } catch (e) {
            favorites = [];
        }
    
        if (!favorites.includes(id)) {
            favorites.push(id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        setIsFavorite(true);
    }
    function removeFavorite(){
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(fav => fav !== id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(false)
    }


    return(
        <>    
        {!coin.name ? <h2>Cargando...</h2>
            :
        <div className="cripto-card">   
        <h1>Criptomoneda: {coin.name}</h1>
        <h2>Ranking: {coin.rank}</h2>
        <h2>Símbolo: {coin.symbol}</h2> 
        <h2>Precio en USD: {Number(coin.priceUsd).toFixed(2)}</h2>
        <h2>Variacion ultimas 24 hs: {Number(coin.changePercent24Hr).toFixed(2)}</h2>
        {isFavorite ? (
            <button className="button"onClick={removeFavorite}>Eliminar de favoritos</button>
            ) : (
                <button className="button" onClick={addFavorite}>Añadir a favoritos</button>

            )}

        <Link to="/">Volver a Home </Link>
       </div>
       
       }
    </>

    )
};

export default Coin;