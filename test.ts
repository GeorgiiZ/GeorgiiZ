import axios = require("axios");
const querysting = require("querystring")
import { AxiosStatic } from "axios"

const port = process.env.PORT || 4000;

const axiosStatic:AxiosStatic = axios.default;

// axiosStatic.post(`http://localhost:${ port }/auth/signUp`, querysting.stringify({ username: 'Jora', password: '123' }) )
// .then((res) => {
//     console.log(res.data);
// });

axiosStatic.post(`http://localhost:${ port }/auth/signin`, querysting.stringify({ username: 'Jora', password: '123' }) )
    .then((res) => {
        console.log(res.data);
    });



