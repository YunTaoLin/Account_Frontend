import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { $color_dark } from "../../scss/styled";
import expenseClassifyList from "../../JS/expenseClassify";
import colorList from "../../JS/colorList.json";
//redux
import { connect } from "react-redux";
import moment from "moment";
//chart
import Chart from "chart.js";
import getChartObj from "../../JS/deal";

const typeEnum = {
  oneWeek: "oneWeek", //一週
  month: "month", //月份
  fullYear: "fullYear", //年度
  other: "other", //自訂
};

const Index = (props) => {
  const [type, setType] = useState(typeEnum.month); //當前模式
  const [header, setHeader] = useState(""); //header顯示文字
  const [dataArray, setDataArray] = useState([]); //當前過濾陣列
  const [cardCardData, setCardData] = useState({list:[],total:0}); //當前過濾陣列轉換卡片
  const [begainDate, setBegain] = useState(moment().startOf("month"));
  const [endDate, setEnd] = useState(moment().endOf("Month"));
  const switchTypeHandler = (type) => {
    setType(type);
    let begain, end;
    //切換
    switch (type) {
      case typeEnum.oneWeek:
        begain = moment().startOf("week").add(1, "day");
        end = moment().endOf("week").add(1, "day");
        setBegain(begain);
        setEnd(end);
        setHeader(`${begain.format("YYYY-MM-DD")}~${end.format("YYYY-MM-DD")}`);
        break;
      case typeEnum.month:
        setBegain(moment().startOf("month"));
        setEnd(moment().endOf("Month"));
        setHeader(`${moment().get("year")}年${moment().get("month") + 1}月`);
        break;
      case typeEnum.fullYear:
        begain = moment().startOf("year");
        end = moment().endOf("year");
        setBegain(begain);
        setEnd(end);
        setHeader(`${begain.get("year")}年 - 全年`);
        break;
      default: //自訂
    }
  };

  const dateHandler = (go) => {
    let begain, end;
    switch (type) {
      case typeEnum.month:
        begain = moment(begainDate._d).add(go, "month").startOf("month");
        end = moment(endDate._d).add(go, "month").endOf("Month");
        setBegain(begain);
        setEnd(end);
        setHeader(`${begain.get("year")}年${begain.get("month") + 1}月`);
        break;
      case typeEnum.fullYear:
        begain = moment(begainDate._d).add(go, "year").startOf("year");
        end = moment(endDate._d).add(go, "year").endOf("year");
        setBegain(begain);
        setEnd(end);
        setHeader(`${begain.get("year")}年 - 全年`);
        break;
      default: //自訂
    }
  };
  //時間區間有改變的時候，調用更新chart
  const chartRef = useRef(null);
  useEffect(() => {
    //將原始資料做過濾
    let array = props.data.accountData.filter((item) => {
      return (
        moment(item.date).isSameOrAfter(begainDate, "date") &&
        moment(item.date).isSameOrBefore(endDate, "date") &&
        item.type === "02"
      );
    });
    setDataArray([...array]);
  }, [begainDate, endDate, props.data.accountData]);

  useEffect(() => {
    new Chart(chartRef.current, getChartObj(dataArray));
  }, [dataArray]);

  useEffect(() => {
    let okData = {list:[],total:0}
    dataArray.forEach((item) => {
    okData.total = okData.total + item.price
    let target = okData.list.find((target)=>target.classify === item.classify)
    if(!target){
      //還沒有該元素
      okData.list.push({
        classify : item.classify,
        price:item.price,
        icon:expenseClassifyList.find((classify)=>item.classify === classify.clssifyName)?.icon
      })
    }else{
      target.price += item.price
    }
    setCardData(okData)
  });
  }, [dataArray]);
  //第一次
  useEffect(() => {
    switchTypeHandler(typeEnum.month);
  }, []);
  return (
    <div className="mainPage">
      <div className="header">
        <div className="header_main">{header}</div>
      </div>
      <div className="main" style={{ backgroundColor: "#8c8c8c" }}>
        <RangeTabs className="shadow_b">
          {/* <div
            onClick={() => switchTypeHandler(typeEnum.other)}
            className={type === typeEnum.other ? "active" : ""}
          >
            自訂
          </div> */}
          <div
            onClick={() => switchTypeHandler(typeEnum.fullYear)}
            className={type === typeEnum.fullYear ? "active" : ""}
          >
            年度
          </div>
          <div
            onClick={() => switchTypeHandler(typeEnum.month)}
            className={type === typeEnum.month ? "active" : ""}
          >
            月份
          </div>
          {/* <div
            onClick={() => switchTypeHandler(typeEnum.oneWeek)}
            className={type === typeEnum.oneWeek ? "active" : ""}
          >
            一週
          </div> */}
        </RangeTabs>
        <PeiChart>
          <canvas
            ref={chartRef}
            width={300}
            height={300}
            style={{ position: "relative", zIndex: 30 }}
          >
            你的瀏覽器不支援此功能。
          </canvas>
          {dataArray?.length > 0 ? (
            <div className="total_container">
              <div className="total">
                支出
                <br />
                <span>{cardCardData.total}</span>
              </div>
            </div>
          ) : (
            <div className="total_container">
              <div className="noData">暫無支出紀錄</div>
            </div>
          )}
          <div className="preHandler" onClick={() => dateHandler(-1)}>
            ▲
          </div>
          <div className="nextHandler" onClick={() => dateHandler(1)}>
            ▲
          </div>
        </PeiChart>
            { dataArray?.length > 0 && <CardContainer>
          {cardCardData.list.map((obj,index) => {
            return (
              <div className="card" key={obj.classify}>
                <div className="percent" style={{backgroundColor:colorList[index],width:`${obj.price/cardCardData.total*100}%`}}></div>
                <div className="classify">{obj.classify}</div>
                <div className="price">${obj.price}</div>
                <div className="icon">
                  <obj.icon />
                </div>
              </div>
            );
          })}
        </CardContainer>}
      </div>
    </div>
  );
};

export default connect((state) => ({ data: state }), {})(Index);

const RangeTabs = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 2px;
  background-color: #fff;
  & > div {
    height: 38px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #bbb;
    position: relative;
    transition: 0.3s;
    &.active {
      color: ${$color_dark};
    }
    &.active:after {
      content: "";
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: -2px;
      left: 0;
      background-color: #707070;
    }
  }
`;

const PeiChart = styled.div`
  margin: 0 auto;
  width: 45%;
  display: flex;
  justify-content: center;
  position: relative;
  .total_container {
    position: absolute;
    top: 55.5%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    padding: 28%;

    /* background-color: rgb(140, 140, 140); */
    .total {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
      line-height: 1.5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > span {
        font-size: 20px;
      }
    }
    .noData {
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
    }
  }
  .preHandler,
  .nextHandler {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    padding-bottom: 10%;
    color: #ccc;
  }
  .preHandler {
    left: 0;
    padding-left: 10%;
    transform: rotate(-90deg) translateY(-120%);
  }
  .nextHandler {
    right: 0;
    padding-right: 10%;
    transform: rotate(90deg) translateY(-120%);
  }
`;
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 32px;
  height: calc(100% - 45vw - 40px);
  padding-bottom:10vh;
  overflow: auto;
  .card {
    width: 45%;
    max-width: 138px;
    flex-shrink: 0;
    height: 110px;
    background-color: #fff;
    margin: 14px 0;
    border-radius: 20px;
    color: #777777;
    padding: 18px 12px 11px 24px;
    > .percent {
      height: 7px;
      width: 90px;
      background-color: #faa;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    > .classify {
      font-size: 13px;
      line-height: 1.2;
    }
    > .price {
      font-size: 18px;
      line-height: 1.3;
    }
    >.icon{
      width:100%;
      display:flex;
      justify-content:flex-end;
    }
  }
`;
