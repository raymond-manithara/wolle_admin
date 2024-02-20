import axios, { AxiosRequestConfig } from "axios";
import { apiBaseUrl } from "../env.const";
import { TOKEN } from "../app.const";

console.log(apiBaseUrl);
const WolleClient = axios.create({
    baseURL:apiBaseUrl
});

WolleClient.interceptors.request.use((config)=>{
    const _token = localStorage.getItem(TOKEN);
    if(_token){
        config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
});

WolleClient.interceptors.response.use((value)=>{
    console.log(value);
    return value;
});

export default WolleClient;