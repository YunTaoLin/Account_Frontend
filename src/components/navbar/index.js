import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  MonetizationOnOutlined,
  InsertChartOutlinedRounded,
  AccountCircleOutlined,
} from "@material-ui/icons";

const NavBar = styled.div`
  width: 100vw;
  height: 56px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 666;
  &.close{
    visibility:hidden;
    display:none;
  }
  & > a {
    color: #ddd;
    flex-grow: 1;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &>*{
        transition: color .1s;
    }
    .icon > svg {
      font-size: 36px;
    }
    .title {
      font-size: 0px;
    }
    &.active {
        color:#707070;
      .title {
        font-size: 12px;
      }
    }
  }
`;

const Index = (props) => {
  const status = props.data.navbarStatus
  return (
    <NavBar className={`shadow_t ${status?'':'close'}`}>
      <NavLink to="/Account">
        <div className="icon">
          <MonetizationOnOutlined></MonetizationOnOutlined>
        </div>
        <div className="title">收支</div>
      </NavLink>
      <NavLink to="/Chart">
        <div className="icon">
          <InsertChartOutlinedRounded></InsertChartOutlinedRounded>
        </div>
        <div className="title">統計表</div>
      </NavLink>
      <NavLink to="/Profile">
        <div className="icon">
          <AccountCircleOutlined></AccountCircleOutlined>
        </div>
        <div className="title">個人資料</div>
      </NavLink>
    </NavBar>
  );
};

export default connect (
  state => ({data: state }),
)(Index);
