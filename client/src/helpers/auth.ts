const cookie = require('js-cookie');


// Set in Cookie
export const setCookie = (key:string, value:string) => {
    if (String(window) !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}
// remove from cookie
export const removeCookie = (key:string) => {
    if (String(window) !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        }); 
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key:string) => {
    if (String(window) !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key:string, value:string) => {
    if (String(window) !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = (key:string) => {
    if (String(window) !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response:any, next:any) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// Access user info from localstorage
export const isAuth = () => {
    if (String(window) !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return true;
                // return JSON.parse(localStorage.getItem('user') || '{}');
            } else {
                return false;
            }
        }
    }
};

export const signout = (next:any) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response:any, next:any) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user') || '{}');
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};