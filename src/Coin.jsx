import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Coin () {
    const {id} = useParams();
    const [coin, setCoin] = useState({});

    useEffect(() => {
         async function getCoin() {
                try {
                    const response = await fetch(`https://rest.coincap.io/v3/assets/${id}`);
                    if(!response.ok) {
                        throw new Error (`La solicitud no fue exitosa: ${response.status}`);
                    }
                    const data = (await response.json());
                    console.log(data.data)              
                    setCoin(data.data)
                } catch (error) {
                    console.log(error + 'Error: no se pudo obtener la criptomoneda.');
                }         
            }
            getCoin()
    },
    [id])


    return(
        <>    
        {!coin.name ? <h2>Cargando...</h2>
            :
       <h1>Criptomoneda: {coin.name}</h1>
       
       
       }
       
    </>
    )
};

export default Coin;