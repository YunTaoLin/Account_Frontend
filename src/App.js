import "./App.scss";
import React,{useEffect} from "react";
import {  Route,Switch,Redirect ,useLocation } from "react-router-dom";
import 'swiper/swiper.scss';
import { connect } from "react-redux";
import {getAccount} from './redux/account/action';
import {getMember} from './redux/member/action';
import {Loading} from './redux/loading/action';
//自定組件
import Navbar from './components/navbar';
import Loadging from './components/Loading'
import ApiWait from './components/ApiWait'
import Drawer from './components/drawer';
import Account from './page/Account';
import Chart from './page/Chart';
import Profile from './page/Profile';
import Add from './page/Add';
import SetBudget from './page/SetBudget';
import Connect from './page/Connect';
//API
import {POST_Token,Line_LoginAuth,LINE_DATA,POST_CreateMember} from './JS/api';
import Qs from 'qs'
import cookie from 'react-cookies'

const useQuery=()=>{
  return new URLSearchParams(useLocation().search);
}

function APP(props) {
  let query = useQuery()
  useEffect(
    () => {
      //  如果cookie沒有UID，則導入登入頁面
       if(cookie.load('UID')){
        myLogin()
      }else{
         //如果網址有callback，則呼叫LINE解析，取得UID
        if(window.location.href.indexOf("code") > -1){
          let lineData = {
            grant_type: "authorization_code",
            redirect_uri: process.env.REACT_APP_RETURN_URL,
            client_id: process.env.REACT_APP_client_id,
            client_secret: process.env.REACT_APP_secret,
            code: query.get('code'),
          };
          let passData = Qs.stringify(lineData);
          Line_LoginAuth(passData)
          .then(({ data }) => {
            LINE_DATA(data.access_token).then((LineData) => {
              cookie.save('UID',LineData.data.userId,{path:"/"})
              cookie.save('name',LineData.data.displayName,{path:"/"})
              cookie.save('headimg',LineData.data.pictureUrl,{path:"/"})
              myLogin()
            });
          })
          .catch((error) => {
            alert(`開始失敗${error}`)
            window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_client_id}&redirect_uri=${process.env.REACT_APP_RETURN_URL}&state=123&scope=profile%20openid%20email`
          });
        }else{
          window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_client_id}&redirect_uri=${process.env.REACT_APP_RETURN_URL}&state=123&scope=profile%20openid%20email`
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const myLogin = ()=>{
    POST_Token(cookie.load('UID')).then(({data})=>{
      if(data.status==='Y'){
        cookie.save('token',data.token,{path:"/"})
        props.getAccount()
        props.getMember()
      }else{
        //進行註冊
        POST_CreateMember({
          "uid": cookie.load('UID'),
          "name": cookie.load('name'),
          "budget": 0,
          "creDate": new Date()
        })
        .then(setTimeout(()=>myLogin(),100))
      }
    }).catch(()=>{
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_client_id}&redirect_uri=${process.env.REACT_APP_RETURN_URL}&state=123&scope=profile%20openid%20email`})
  }
  return (
    <div className="mobile_container" style={{height:window.innerHeight - 56}}>
      <Drawer style={{position:'relative'}}></Drawer>
      <Switch>
        <Route path="/Add" component={Add}></Route>
        <Route path="/Chart" component={Chart}></Route>
        <Route path="/Profile" component={Profile}></Route>
        <Route path="/SetBudget" component={SetBudget}></Route>
        <Route path="/connect" component={Connect}></Route>
        <Route path="/Account" component={Account}></Route>
        <Redirect to="/Account" />
      </Switch>
      <Navbar></Navbar>
      <Loadging />
      {props.data.loadingStatus.apiwait && <ApiWait/>} 
    </div>
  );
}

export default connect (
  state => ({data: state }), 
  {
    getAccount,
    getMember,
    Loading
  }
)(APP);
