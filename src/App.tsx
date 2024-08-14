import React, { useState, useEffect } from 'react';
import { Player} from './types/DataItem';
import { fetchPlayers } from './services/api';
import "./App.css"

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [pairs, setPairs] = useState<[Player, Player][]>([]);

  

  useEffect(() => {
    const getPlayers = async () => {
      const fetchedPlayers = await fetchPlayers();
      console.log('Fetched players:', fetchedPlayers);
      setPlayers(fetchedPlayers);
    };
    getPlayers();
  }, []);

  const handleSearch = () => {
    console.log('Target Height:', targetHeight);
    const foundPairs = findPlayerPairs(players, targetHeight);
    setPairs(foundPairs);
  };

  const findPlayerPairs = (players: Player[], targetHeight: number): [Player, Player][] => {
    let pairs: [Player, Player][] = [];
    
    for (let i = 0; i < players.length; i++) {
      const height1 = Number(players[i].h_in)
      for (let j = i + 1; j < players.length; j++) {
        const height2 = Number(players[j].h_in)
        if (height1 + height2 === targetHeight) {
          pairs.push([players[i], players[j]]);
        }
      }
    }
  
    console.log('Pairs found:', pairs);
    return pairs;
  };
  
  





  return (
    <div>
      <h1>Player Height Matcher</h1>
      <input 
        placeholder='Enter the height'
        onChange={(e) => {
        const value = Number(e.target.value);
        console.log('Target height set to:', value);
        setTargetHeight(value);
        }}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {pairs.length > 0 ? (
          pairs.map((pair, index) => (
            <li key={index}>
              {pair[0].first_name} {pair[0].last_name} and {pair[1].first_name} {pair[1].last_name}
            </li>
          ))
        ) : (
          <p>No pairs found with that combined height.</p>
        )}
      </ul>

     
    </div>
  );
};

export default App;




