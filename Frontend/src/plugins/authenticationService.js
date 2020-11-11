import axios from "axios";

const isAuthenticated = () => {
    return (localStorage.getItem('token') !== null)
}

const authenticate = (password) => {
    axios({
        method: 'post',
        url: process.env.VUE_APP_API + '/api/auth/login',
        data : {'mail': 'app.memomental@gmail.com','password': password},
        headers : {'Content-Type': 'application/json'}
    })
    .then((res) => {
        localStorage.setItem('token', res.data.token)
        return true
    })
    .catch((err) => {
        localStorage.clear();
        return false
    })
}

const authenticationService = {
  isAuthenticated,
  authenticate
};

export default authenticationService;