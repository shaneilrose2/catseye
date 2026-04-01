import { useState } from 'react';
import './App.css'
import './Discover'
import Discover from './Discover'

function App() {

  const [ banList, setBanList ] = useState([]);

  const addToBanList = (attribute) => {
        if (!banList.includes(attribute)) {
            setBanList([...banList, attribute]);
        }   
    };

    const removeBanList = (attribute) => {
      setBanList(banList.filter(item => item != attribute));
    };

  return (
    <>
    
    <div className="grid-container">
      <div className="column left">
        <h1>Banned</h1>
        {banList.map((item, index) => (
          <button className='banned-button' key={index} onClick={() => removeBanList(item)}>
            {item}
          </button>
          
        ))}
      </div>
      <div className="column right">
        <h1>Discover</h1>
        <h2>Explore cute cats around the world!</h2>
        <Discover banList={banList} addToBanList={addToBanList}/>
      </div>
    </div>

    </>
  )
}

export default App
