import axios from "axios";

const isAuthenticated = () => {
    return (localStorage.getItem('token') !== null)
}

const authenticate = (password) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: process.env.VUE_APP_API + '/api/auth/login',
            data : {'mail': 'app.memomental@gmail.com','password': password},
            headers : {'Content-Type': 'application/json'}
        })
        .then((res) => {
            localStorage.setItem('token', res.data.token)
            resolve()
        })
        .catch((err) => {
            localStorage.clear();
            reject(err)
        })
    })
}

const logout = () => {
    localStorage.clear();
}

const authenticationService = {
  isAuthenticated,
  authenticate,
  logout
};

export default authenticationService;