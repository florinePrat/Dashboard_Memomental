import axios from "axios";

const isAuthenticated = () => {
    return true;
}

const authenticate = (mail, password) => {
    return axios({
        method: 'post',
        url: process.env.VUE_APP_API + '/api/auth/login',
        data : {'mail': mail,'password': password},
        headers : {'Content-Type': 'application/json'}
    })
}

const authenticationProvider = {
  isAuthenticated,
  authenticate
};

export default authenticationProvider;