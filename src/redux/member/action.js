
import {POST_Member,PUT_Budget} from '../../JS/api';
import {Loading} from '../loading/action'

// 同步action >> Function
export const getMember = () =>{
    return (dispatch) =>{
        POST_Member()
        .then(({data})=>{
            dispatch(SET_Member(data))
            setTimeout(()=>{
                dispatch(Loading(false))
            },1000)
        })
      }
} 
export const updateBudget = (budget) =>{
    return (dispatch) =>{
        PUT_Budget(budget)
        .then(({data})=>{
            dispatch(UPDATE_Budget(data))
        })
      }
} 

const SET_Member = (data) => ({type:'SET_Member',data})
const UPDATE_Budget = (budget) => ({type:'UPDATE_Budget',budget})
// const ADD_ACCOUNT = (data) => ({type:'ADD_ACCOUNT',data})