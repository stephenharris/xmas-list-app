
import axios from 'axios';
import store from '../redux/store';
import {getAccessToken} from '../redux/selectors';

class Api {


    getMyLists() {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + '/list',
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }
    createList(name) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + '/list',
            {
                "name": name 
            },
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }
    
    getMyList(listId) {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + `/list/${listId}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    deleteList(listId) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/list/${listId}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    updateMyList(listId, name) {
        const accessToken = getAccessToken(store.getState());
        return axios.put(
            process.env.REACT_APP_API_URL + `/list/${listId}`,
            {
                "name": name 
            },
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    getMyFavourites() {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + '/favourites/',
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    addListToFavourites(listUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + '/favourites/',
            {
              "list": listUuid 
            },
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    removeListFromFavourites(listUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/favourites/${listUuid}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    addToMyList(listId, description) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + `/list/${listId}/item/`,
            {
              "description": description 
            },
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    removeFromMyList(listId, itemId) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/list/${listId}/item/${itemId}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    getList(listId) {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + `/list/${listId}/`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    markAsBought(listId, itemUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + `/list/${listId}/item/${itemUuid}/mark`,
            {},
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    unmarkAsBought(listId, itemUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/list/${listId}/item/${itemUuid}/mark`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }
}

export default new Api();