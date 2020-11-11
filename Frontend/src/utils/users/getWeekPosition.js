import axios from "axios";
import authenticationService from "../../plugins/authenticationService"

export function getWeekPosition (){
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/users/positionWeek/',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + authenticationService.getToken()
        }
    })
}
