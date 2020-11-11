//import axios from "axios";
//import {getCookie} from "../cookies";

export function getPosition (){
    let burl = process.env.VUE_APP_API;
    return axios({
        method: 'get',
        url: burl + '/api/users/positionGeneral/',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie('token')
        }
    })
}
