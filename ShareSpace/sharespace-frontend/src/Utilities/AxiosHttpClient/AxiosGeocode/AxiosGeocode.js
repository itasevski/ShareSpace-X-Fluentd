import axios from "axios";

const AxiosGeocode = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/geocode`
});

export default AxiosGeocode;