
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



export const isLoggedIn = store => getAccessToken(store) ? true: false
