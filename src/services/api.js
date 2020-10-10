
import axios from 'axios';
import store from '../redux/store';
import {getAccessToken} from '../redux/selectors';

class Api {

    loginWithGoogle(token) {
        return axios.post(
            process.env.REACT_APP_API_URL + '/login',
            {
              strategy: 'google',
              token: token
            }
        );
    }

    loginWithEmail(token) {
        return axios.post(
            process.env.REACT_APP_API_URL + '/login',
            {
              strategy: 'email',
              token: token
            }
        );
    }

    sendConfirmationEmail(email, redirect) {
        return axios.post(
            process.env.REACT_APP_API_URL + '/confirm-email',
            {
              email: email,
              redirect: redirect
            }
        );
    }

    getMyList() {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + '/list-item/mine/',
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    updateMyList(name) {
        const accessToken = getAccessToken(store.getState());
        return axios.put(
            process.env.REACT_APP_API_URL + '/list-item/mine/',
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

    addToMyList(description) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + '/list-item/',
            {
              "description": description 
            },
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    removeFromMyList(itemId) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/list-item/${itemId}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    getList(listId) {
        const accessToken = getAccessToken(store.getState());
        return axios.get(
            process.env.REACT_APP_API_URL + `/list-item/${listId}/`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    markAsBought(listId, itemUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.post(
            process.env.REACT_APP_API_URL + `/mark-item/${listId}/${itemUuid}`,
            {},
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }

    unmarkAsBought(listId, itemUuid) {
        const accessToken = getAccessToken(store.getState());
        return axios.delete(
            process.env.REACT_APP_API_URL + `/mark-item/${listId}/${itemUuid}`,
            { headers: {"Authorization" : `Bearer ${accessToken}`} }
        );
    }
}

export default new Api();