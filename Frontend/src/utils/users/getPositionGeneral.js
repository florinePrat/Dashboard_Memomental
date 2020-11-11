import axios from "axios";
import authenticationService from "../../plugins/authenticationService"

export function getPosition (){
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/users/positionGeneral/',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + authenticationService.getToken()
        }
    })
}
