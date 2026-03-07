import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './App.css'

function Home() {
    const [coins, setCoins] = useState([]);
    
    useEffect (() => {
        const fetchCoins = async () => {
            try {
               const response = await fetch('https://rest.coincap.io/v3/assets')
               if(!response.ok) {
                    throw new Error (`La solicitud no fue exitosa: ${response.status}`);
                }
               const data = (await response.json());
               console.log(data);
               setCoins(data.data)
            }
            catch (error) {
                console.log(error, 'Error en la petición')
            }
        }
        fetchCoins()
    }, [])

    return (
        <>
        <h1 className="title">Listado de criptomonedas:</h1>
        <div className="grid">

       
            {coins.map((cripto) => {
                const {id,rank, symbol, name} = cripto;
                return (<Link to={`/coin/${id}`} key={id}>
                <div className="cripto-card">
                    <h2>Ranking: {rank}</h2>
                    <h2>Nombre: {name}</h2>
                    <h3>Símbolo: {symbol}</h3>                
               </div>
                </Link>)
            })}
        
       </div>
        
        </>
    )
};

export default Home;