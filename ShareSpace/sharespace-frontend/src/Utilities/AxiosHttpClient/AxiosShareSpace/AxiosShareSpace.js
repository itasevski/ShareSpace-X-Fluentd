import axios from "axios";

const AxiosShareSpace = axios.create({
    baseURL: `http://localhost:9001`,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
});

export default AxiosShareSpace;