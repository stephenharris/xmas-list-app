import jwt from 'jsonwebtoken'

export const getAccessToken = store => {
    return store.authenticatedUser.access_token;
}

export const getLoggedInUser = store => {

    if(!store.authenticatedUser.access_token) {
        return null;
    }
    var base64Url = store.authenticatedUser.access_token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).email;
}



export const isLoggedIn = store => {
    let accessToken = getAccessToken(store);
    
    if (!accessToken) {
        console.log("no access token");
        return false;
    }

    var decodedToken = jwt.decode(accessToken, {complete: true});
    var dateNow = new Date();

    if(decodedToken.exp < dateNow.getTime()){
        console.log("token expired");
        return false;
    }

    console.log("token valid");
    return true;
}