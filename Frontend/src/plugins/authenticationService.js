import axios from "axios";

const isAuthenticated = () => {
    return (localStorage.getItem('token') !== null)
}

const authenticate = (password) => {
    console.log(password)
    axios({
        method: 'post',
        url: process.env.VUE_APP_API + '/api/auth/login',
        data : {'mail': process.env.ADMIN_MAIL,'password': password},
        headers : {'Content-Type': 'application/json'}
    })
    .then((res) => {
        console.log(res.data)
        //localStorage.setItem('token', res.data.token)
    })
    .catch((err) => {
        console.log(err)
        localStorage.clear();
    })
}

const authenticationService = {
  isAuthenticated,
  authenticate
};

export default authenticationService;