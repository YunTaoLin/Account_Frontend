import React, { useState,useEffect} from "react";
import styled from "styled-components";
import { $color_3, $color_dark } from "../../scss/styled";
import KeyBoard from "../../components/Account/KeyBoard";
import { useHistory } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { UPDATE_NAVBAR } from "../../redux/closeNavbar/action";
import { getAccount } from "../../redux/account/action";
import {getMember} from '../../redux/member/action';
import {PUT_Budget} from "../../JS/api";

const Index = (props) => {

  const [price, setPrice] = useState("0");
  useEffect(()=>{
    props.UPDATE_NAVBAR(false);
  },[props])
  useEffect(()=>{
    return () => {
        props.UPDATE_NAVBAR(true)
    }
  },[])
  const confirm = () => {
    return parseFloat(price) !== 0;
  };
  let history = useHistory();
  //新增一筆資料
  const saveBudget = () => {
    if (!confirm()) return;
    PUT_Budget(parseFloat(price)).then((res) => {
      props.UPDATE_NAVBAR(true);
      props.getMember();
      history.push({
        pathname: "/"
      });
    });
  };

  return (
    <div className="mainPage">
      <div className="header">
        <div className="header_main">
          每月預算設定
        </div>
      </div>
      <div className="main shadow_t_inset">
        <Add>
          <div className="inputBar" >
            <span>TWD</span>
            <span className={price.length > 5 ? "smallFontSize" : ""}>
              $ {price}
            </span>
          </div>
          <div className="computed">
              <div>每日平均可花費約為：{Math.round(parseFloat(price)/30 * 10) / 10 } 元</div>
              <div>實際金額依照每月天數變動（四捨五入）</div>
          </div>
          <div className="nowSetting">
              當前設定：{props.data.memberData.budget || '未設定'}
          </div>
          <KeyBoard
            show={true}
            setPrice={setPrice}
            price={price}
            closeKeyBoard={() => saveBudget()}
          />
        </Add>
      </div>
    </div>
  );
};

export default connect((state) => ({ data: state }), {
  UPDATE_NAVBAR,
  getAccount,
  getMember,
})(Index);



const Add = styled.div`
  width: 100%;
  .inputBar {
    width: 100%;
    height: 92px;
    padding: 19px 23px 28px 16px;
    background-color: ${$color_3};
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 44px;
    line-height: 56px;
    flex-wrap: 700;
    .smallFontSize {
      font-size: 32px;
      transition: 0.3s;
    }
  }
  .saveAccount {
    max-width: 312px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-right: auto;
    margin-left: auto;
    color: #fff;
    margin-top: 88px;
    background-color: #ddd;
    &.active {
      background-color: rgba(0, 0, 0, 0.75);
    }
  }
  .computed{
    padding: 12px 30px;
    width:100%;
    color:${$color_dark};
    font-size:13px;
    line-height:2;
  }
  .nowSetting{
    padding: 0 30px 12px;
    font-size:14px;
    width:100%;
    color:${$color_dark};
    line-height:2;
  }
`;
