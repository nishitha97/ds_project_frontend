import axios from 'axios';

/**
 * common class for to handle all axios requests
 *
 * @author IT17006880
 */
export default class Axios {

    static get(url) {
        const config = {headers: {'Access-Control-Allow-Origin': '*'}};
        return axios.get(url, config);
    }

    static post(url, data) {
        const config = {headers: {'Access-Control-Allow-Origin': '*'}};
        return axios.post(url, data, config);
    }

    static put(url, data) {
        const config = {headers: {'Access-Control-Allow-Origin': '*'}};
        return axios.put(url, data, config);
    }

    static delete(url) {
        const config = {};
        return axios.delete(url, config);
    }

}