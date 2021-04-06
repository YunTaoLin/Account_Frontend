import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {Build,AccountCircle,ExitToApp,ListAlt} from '@material-ui/icons';
import { NavLink } from "react-router-dom";
import { $color_dark } from "../../scss/styled";
import cookie from 'react-cookies'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => {
    console.log(open);
    setState(open);
  };
  const logout = ()=>{
    cookie.remove('UID')
    cookie.remove('token')
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.REACT_APP_client_id}&redirect_uri=${process.env.REACT_APP_RETURN_URL}&state=123&scope=profile%20openid%20email`
  }

  const list = () => (
    <ListComtainer
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <div className="draw_header">會員中心</div>
      <List className={classes.list}></List>
      <Divider />
      <List style={{height:'60vh'}}>
        <NavLink to="/Profile" className="link_item">
            <div className="icon">
                <AccountCircle/>
            </div>
            <div className="title">個人資料</div>
        </NavLink>
        <NavLink to="/SetBudget" className="link_item">
        <div className="icon">
            <ListAlt/>
        </div>
        <div className="title">設定每月預算</div>
      </NavLink>
        <NavLink to="/Connect" className="link_item">
        <div className="icon">
            <Build/>
        </div>
        <div className="title">聯絡開發者</div>
      </NavLink>
      </List>
      <Divider />
      <div className="draw_footer">
      <div  className="link_item" onClick={()=>logout()}>
        <div className="icon">
            <ExitToApp/>
        </div>
        <div className="title">登出</div>
      </div>
      </div>
    </ListComtainer>
  );

  return (
    <div>
      <React.Fragment>
        <Hamburger onClick={() => toggleDrawer(true)}>
          <svg
            id="Burger_Button"
            data-name="Burger Button"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect id="Bounds" width="28" height="24" fill="none" />
            <path
              id="Icon"
              d="M3,18H21V16H3v2Zm0-5H21V11H3v2ZM3,6V8H21V6Z"
              fill="#707070"
            />
          </svg>
        </Hamburger>
        <Drawer
          anchor={"left"}
          open={state}
          onClose={() => toggleDrawer(false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

const Hamburger = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 64px;
  z-index: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListComtainer = styled.div`
    a{
        text-decoration:none !important;
        color: ${$color_dark};
    }
    .draw_header{
        height: 60px;
        padding-left:30px;
        display:flex;
        align-items:flex-end;
        font-size:20px;
        letter-spacing:2px;
    }
    .draw_footer{
        padding: 8px 0;
    }
    .link_item{
        display:flex;
        padding:12px 20px;
        .icon{
            width:48px;
            height:26px;
            >img{
                height:100%;
            }
        }
        .title{
            line-height: 24px;
            letter-spacing: 0.00938em;
        }
    }
`;