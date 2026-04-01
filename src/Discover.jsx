import './Discover.css'
import { useState } from 'react'

function Discover({ banList, addToBanList}) {
    const [currentCat, setCurrentCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const API_KEY = import.meta.env.VITE_CAT_API_KEY;
    const url = `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${API_KEY}`;

    const getCat = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const newCat = data[0];
            console.log(newCat);

            if (!newCat.breeds || newCat.breeds.length === 0){
                setIsLoading(false);
                return getCat();
            }
            
            setCurrentCat(newCat);

            const breedName = newCat.breeds[0].name;
            const origin = newCat.breeds[0].origin;
            const lifeSpan = newCat.breeds[0].life_span;
            const temper = newCat.breeds[0].temperament;

            if (banList.includes(breedName) || banList.includes(origin) || banList.includes(lifeSpan) || banList.includes(temper)) {
                return getCat();
            }

            
        }
        catch (error) {
            console.error("Fetch issue: ", error);
        } 
        finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="discover-main">
        <div className="cat-card">
            {currentCat ? (
                <div>
                    <img src={currentCat.url} alt="cat pic" className="cat-image"/>
                    
                    <div className='attribute-container'>
                        {/*Breed*/}
                        <button
                            className='attribute-button'
                            onClick={()=> addToBanList(currentCat.breeds[0].name)}
                        >   
                            {currentCat.breeds[0].name}
                        </button>
                    </div> 
                    <div className='attribute-container'>
                        {/*Origin*/}
                        <button
                            className='attribute-button'
                            onClick={()=> addToBanList(currentCat.breeds[0].origin)}
                        >   
                            {currentCat.breeds[0].origin}
                        </button>
                    </div> 
                    <div className='attribute-container'>
                        {/*Temperament*/}
                        <button
                            className='attribute-button'
                            onClick={()=> addToBanList(currentCat.breeds[0].temperament)}
                        >   
                            {currentCat.breeds[0].temperament}
                        </button>
                    </div>  
                    <div className='attribute-container'>
                        {/*Life Span*/}
                        <button
                            className='attribute-button'
                            onClick={()=> addToBanList(currentCat.breeds[0].life_span)}
                        >   
                            {currentCat.breeds[0].life_span}
                        </button>
                    </div> 
                </div>
            ) : (
              <h2>Click for a surprise!</h2>
            )}
        
        <button className="discover-button" onClick={getCat}>
                {isLoading ? "Loading..." : "Discover"}
        </button>
        </div>
    </div>
    );
};

export default Discover;