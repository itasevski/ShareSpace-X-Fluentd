import AxiosGeocode from "../Utilities/AxiosHttpClient/AxiosGeocode/AxiosGeocode";

const GeocodeService = {
    fetchGeolocationData: (lat, lng) => {
        return AxiosGeocode.get(`/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
    }
}

export default GeocodeService;