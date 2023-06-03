import axios from 'axios';

const API_BASE_URL = 'https://disease.sh/v3';

export const fetchWorldData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/covid-19/all`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching world-wide data');
  }
};

export const fetchCountryData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/covid-19/countries`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching country-specific data');
  }
};

export const fetchGraphData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/covid-19/historical/all?lastdays=all`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching graph data');
  }
};
