
import {POST_Account} from '../../JS/api';
// 同步action >> Function
export const getAccount = () =>{
    return (dispatch) =>{
        POST_Account()
        .then(({data})=>{
            dispatch(SET_ACCOUNT(data))
        })
      }
} 

const SET_ACCOUNT = (data) => ({type:'SET_ACCOUNT',data})
// const ADD_ACCOUNT = (data) => ({type:'ADD_ACCOUNT',data})