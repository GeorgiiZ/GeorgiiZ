import querysting from "querystring";
import axios from "axios";

const port = process.env.PORT || 4000;

axios.post(`http://localhost:${ port }/auth/signUp`, querysting.stringify({ username: 'Jora', password: '1234' }) )
.then((res) => {
    console.log(res.data);
});

// axios.post(`http://localhost:${ port }/auth/signin`,  querysting.stringify({ username: 'Jora', password: '123' }))
// .then((res) => {
//     console.log(res.data);
// });



