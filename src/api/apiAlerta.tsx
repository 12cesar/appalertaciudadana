import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const baseURL = 'https://gongalsoft.com/api';


const alertaApi = axios.create({baseURL});

alertaApi.interceptors.request.use(
    async(config:any)=>{
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.token= token;
        }
        return config
    }
);

export default alertaApi;