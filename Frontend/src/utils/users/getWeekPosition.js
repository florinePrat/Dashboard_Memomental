//import axios from "axios";
//import {getCookie} from "../cookies";

export function getWeekPosition (){
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/users/positionWeek/',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie('token')
        }
    })
}
