import React, { useState } from "react";
import styled from "styled-components";
import { $color_1, $color_2, $color_dark } from "../../scss/styled";
import incomeClassifyList from "../../JS/incomeClassify";
import expenseClassifyList from "../../JS/expenseClassify";
import KeyBoard from "../../components/Account/KeyBoard";
import { useLocation, useHistory } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { UPDATE_NAVBAR } from "../../redux/closeNavbar/action";
import { getAccount } from "../../redux/account/action";
import { POST_AddAccount } from "../../JS/api";
import moment from "moment";


const Index = (props) => {
  const selectDate = useLocation().state.date;
  //如果沒有selectDate，要跳轉回去

  const [type, setType] = useState("expense");
  const [classify, setCalssify] = useState("");
  const [price, setPrice] = useState("0");
  const [keyBoard, setKeyBoard] = useState(false);
  const switchType = (type) => {
    setKeyBoard(false)
    setCalssify("")
    setPrice("0")
    setType(type);
  };
  const selectClassify = (classify) => {
    setCalssify(classify);
  };
  const keyBoardHandler = (type) => {
    props.UPDATE_NAVBAR(!type);
    setKeyBoard(type);
    setPrice(parseFloat(price).toString())
  };
  const confirm = () => {
    return parseFloat(price) !== 0 && classify;
  };
  let history = useHistory();
  //新增一筆資料
  const saveAccount = () => {
    if (!confirm()) return;
    const Arg = {
      type: type === "income" ? "01" : "02",
      price: parseFloat(price),
      classify,
      date: moment(new Date(selectDate)).format("YYYY-MM-DD"),
    };
    POST_AddAccount(Arg).then((res) => {
      props.getAccount();
      history.push({
        pathname: "/",
        state: {
          date: selectDate,
        },
      });
    });
  };

  return (
    <div className="mainPage">
      <div className="header">
        <div className="header_main">
          <Tabs>
            <div
              onClick={() => switchType("expense")}
              className={`expense ${type === "expense" ? "active" : ""}`}
            >
              支出
            </div>
            <div
              onClick={() => switchType("income")}
              className={`income ${type === "income" ? "active" : ""}`}
            >
              收入
            </div>
          </Tabs>
        </div>
      </div>
      <div className="main shadow_t_inset">
        <Add>
          <div className={`inputBar ${type}`} onClick={() => keyBoardHandler(true)}>
            <span>TWD</span>
            <span className={price.length > 5 ? "smallFontSize" : ""}>
              $ {price}
            </span>
          </div>
          <div className="classifyGroup">
            {type === "income"
              ? incomeClassifyList.map((item) => {
                  return (
                    <div
                      onClick={() => selectClassify(item.clssifyName)}
                      className={`clssifyItem ${
                        classify === item.clssifyName ? "active" : ""
                      }`}
                      key={item.clssifyName}
                    >
                      <div className="icon">
                        <item.icon></item.icon>
                      </div>
                      <div className="text">{item.clssifyName}</div>
                    </div>
                  );
                })
              : expenseClassifyList.map((item) => {
                  return (
                    <div
                      onClick={() => selectClassify(item.clssifyName)}
                      className={`clssifyItem ${
                        classify === item.clssifyName ? "active" : ""
                      }`}
                      key={item.clssifyName}
                    >
                      <div className="icon">
                        <item.icon></item.icon>
                      </div>
                      <div className="text">{item.clssifyName}</div>
                    </div>
                  );
                })}
          </div>
          <div
            onClick={() => saveAccount()}
            className={`saveAccount ${confirm() ? "active" : ""}`}
          >
            {moment(selectDate).format('YYYY-MM-DD')} 新增一筆{type === "income"?'收入':'支出'}
          </div>
          <KeyBoard
            show={keyBoard}
            setPrice={setPrice}
            price={price}
            closeKeyBoard={() => keyBoardHandler(false)}
          />
        </Add>
      </div>
    </div>
  );
};

export default connect((state) => ({ data: state }), {
  UPDATE_NAVBAR,
  getAccount,
})(Index);

const Tabs = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: ${$color_dark};
  font-size: 20px;
  line-height: 27px;
  > div {
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: "";
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      width: 69px;
      height: 2px;
      transition: 0.3s;
    }
    &.income.active::after {
      color: #000;
      background-color: ${$color_1};
    }
    &.expense.active::after {
      color: #000;
      background-color: ${$color_2};
    }
  }
`;

const Add = styled.div`
  width: 100%;
  .inputBar {
    width: 100%;
    height: 92px;
    padding: 19px 23px 28px 16px;
    background-color: ${$color_2};
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 44px;
    line-height: 56px;
    flex-wrap: 700;
    &.income{
      background-color: ${$color_1};
    }
    .smallFontSize {
      font-size: 32px;
      transition: 0.3s;
    }
  }
  .classifyGroup {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .clssifyItem {
      width: 20%;
      height: 64px;
      padding-top: 12px;
      color: ${$color_dark};
      text-align: center;
      &.active {
        background-color: #ccc;
      }
      .icon {
        margin: 0 auto;
        > svg {
          width: 28px;
          height: 28px;
        }
      }
      .text {
        font-size: 14px;
      }
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
`;
