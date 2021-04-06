import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { $color_2, $color_dark,$color_3 } from "../../../scss/styled";
const UI = (props) => {
    const {setPrice,price} = props
    const inputNumber = (number)=>{
        let numberString = price + number
        if(numberString.length === 11){
            return; //不能超過十個字
        }
        if(numberString[0]==='0' && numberString[1]!=='.'){
            numberString = numberString.slice(1) //開頭為零要去掉，除非是0.X
        }
        if(numberString.split('.').length=== 3){
            return ; //不能有兩個小數點
        }
        if(numberString[numberString.length-1]==='.' ||
        numberString.split('.')[0]==='0' //這邊有bug，後續優化
        ){
            setPrice(numberString)
        }else{
            setPrice(parseFloat(numberString).toString())
        }
    }
    const inputBack = ()=>{
        if(price.length>1){
            setPrice(price.slice(0,price.length-1))
        }else{
            setPrice('0')
        }
    }
  return (
    <KeyBoard className={`shadow_t ${props.show?'active':''}`} >
      <div className="number">
        <div onClick={()=>inputNumber('1')}>1</div>
        <div onClick={()=>inputNumber('2')}>2</div>
        <div onClick={()=>inputNumber('3')}>3</div>
        <div onClick={()=>inputNumber('4')}>4</div>
        <div onClick={()=>inputNumber('5')}>5</div>
        <div onClick={()=>inputNumber('6')}>6</div>
        <div onClick={()=>inputNumber('7')}>7</div>
        <div onClick={()=>inputNumber('8')}>8</div>
        <div onClick={()=>inputNumber('9')}>9</div>
        <div onClick={()=>inputNumber('.')}>.</div>
        <div onClick={()=>inputNumber('0')}>0</div>
        <div onClick={()=>inputBack()}>←</div>
      </div>
      <div className="control">
        <div onClick={()=>setPrice('0')} className="AC">AC</div>
        <div onClick={props.closeKeyBoard} className="OK">OK</div>
      </div>
    </KeyBoard>
  );
};

const KeyBoard = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100000;
  width: 100vw;
  height: ${window.innerHeight - 300}px;
  background-color: #F7F7F7;
  display: none;
  align-items: stretch;
  justify-content: stretch;
  font-size: 35px;
  font-weight: 700;
  &.active{
      display:flex;
  }
  .number {
    width: 75%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 33.3333%;
      height: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${$color_dark};
    }
  }
  .control {
    width: 25%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.AC{
          background-color: ${$color_3};
      }
      &.OK{
          background-color: ${$color_2};
      }
    }
  }
`;

export default connect(
  (state) => ({ data: state }),
  //精簡寫法，一個物件
  {}
)(UI);
