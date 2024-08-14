// src/services/api.ts
// src/services/api.ts
import axios from 'axios';
import { Player } from '../types/DataItem';

const API_URL = 'https://mach-eight.uc.r.appspot.com/';

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const response = await axios.get(API_URL);
    console.log('Raw API response:', response.data);

    if (response.data && Array.isArray(response.data.values)) {
      return response.data.values as Player[];
    } else {
      console.error('Unexpected data format from API:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};




  
  