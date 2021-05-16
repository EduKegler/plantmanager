import axios from 'axios';
import { REACT_APP_URL } from 'react-native-dotenv';

const api = axios.create({
    baseURL: REACT_APP_URL
})

export default api;
