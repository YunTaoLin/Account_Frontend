import axios from 'axios'
import cookie from 'react-cookies'
let config = {
    headers: {
      "Content-Type": "application/json",
    },
};
//process.env.REACT_APP_BASE_API
const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: config.headers,
})

//取得token
export  function POST_Token(UID){
    return  api.post(`/Auth/login`,{UID},config)
}
//進行註冊
export  function POST_CreateMember(obj){
    return  api.post(`/Member/createMember`,obj,config)
}

//取得會員帳務列表
export  function POST_Account(){
    config.headers.Authorization = "Bearer " + cookie.load('token');
    return  api.post(`/Account/AccountList`,{},config)
}
//取得會員資料
export  function POST_Member(){
    config.headers.Authorization = "Bearer " + cookie.load('token');
    return  api.post(`/Member/Member`,{},config)
}
//更新會員預算
export  function PUT_Budget(budget){
    config.headers.Authorization = "Bearer " + cookie.load('token');
    return  api.put(`/Member/updateBudget`,{budget},config)
}

//新增一筆帳務
export  function POST_AddAccount(accountObj){
    config.headers.Authorization = "Bearer " + cookie.load('token');
    return  api.post(`/Account/addAccount`,accountObj,config)
}

export  function Line_LoginAuth(Arg){
    return  api.post("https://api.line.me/oauth2/v2.1/token",Arg,{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
}
export  function LINE_DATA(LineToken){
    return  api.get("https://api.line.me/v2/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + LineToken,
        },
      })
}

// api.interceptors.request.use(
//     function (config) {
//         store.dispatch({type:'update_loading',data:true})
//     },
//     function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     }
//   );
//   // Add a response interceptor
//   api.interceptors.response.use(
//     function (response) {
//         store.dispatch({type:'update_loading',data:false})
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
//   );