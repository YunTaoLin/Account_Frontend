import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import robotImg from '../../../asset/robot.png';
import { NavLink } from "react-router-dom";
import moment from 'moment'
require('twix');

const Index = ({overage,budget,selectedDate}) => {
    const [toastIsOpen,setToast] = useState(false)
    const [available,setAvailable] = useState('')

    const openToast=()=>{
        if(!budget) return;
        setToast(!toastIsOpen)
        setTimeout(()=>{
            setToast(false)
        },3000)
    }
    useEffect(()=>{
        if(moment().startOf("month")._d.toString() === moment(selectedDate).startOf("month")._d.toString()){
            let t = moment().twix(new Date(moment().endOf("month")));
            let average =  Math.round((budget+overage)/t.count('days')*100)/100 
            setAvailable(`${moment().format('YYYY年MM月')}，剩餘${t.count('days')}天，<br/>
            平均每日可花費${average}元`) 
        }else if(moment(selectedDate).startOf("month").isAfter(moment().startOf("month"))){
            setAvailable( `本月還沒開始喔`)
        }else{
            setAvailable(`本月已經結算囉`)
        }
    },[budget, overage, selectedDate])
    return (
        <BedgetBar className="shadow_t ">
            <div className="robotArea" onClick={openToast}>
                <img src={robotImg} className={toastIsOpen?'jumps':''} alt=""/>
                <div className={`toast ${toastIsOpen?'Open':''}`} dangerouslySetInnerHTML={{__html:available}}>
                </div>
            </div>
            {budget? 
                <div className="showBudget">
                  <div className="moneyicon">$</div>
                  <div className="price1">{budget+overage}</div>
                  <div className="slash">/</div>
                  <div className="price2">{budget}</div>
                  <div className="title1">剩餘總額</div>
                  <div className="title2">預算總額</div>
              </div>
              :
                <div className="noSetBudget">
                    新增設定每月預算，<br/>可以在此查看剩餘金額
                    <NavLink to="/SetBudget" className="toBtn">前往設定</NavLink>
                </div>
        
        }
        </BedgetBar>
    )
}

export default Index




const BedgetBar = styled.div`
    display:flex;
    width:100%;
    height:76px;
    padding: 16px 12px 8px 28px;
    &>.robotArea{
        width:56px;
        position: relative;
        bottom:6px;
        img{
            height:56px;
            animation: move 5s infinite;
            &.jumps{
                animation: jumps 5s infinite;
            }
        }
        @keyframes move{
            0%{
                transform:rotate(0) translate(0,0);
            }
            40%{
                transform:rotate(0) translate(0,0px);
            }
            50%{
                transform:rotate(-10deg) translate(-4px,-4px);
            }
            60%{
                transform:rotate(0) translate(0,0px);
            }
            70%{
                transform:rotate(10deg) translate(4px,-4px);
            }
            80%{
                transform:rotate(0) translate(0,0);
            }
            100%{
                transform:rotate(0) translate(0,0);
            }
        }
        @keyframes jumps{
            5%{
                transform:rotate(0) translate(0,-8px);
            }
            10%{
                transform:rotate(0) translate(0,0px);
            }
            15%{
                transform:rotate(0) translate(0,-8px);
            }
            20%{
                transform:rotate(0) translate(0,0px);
            }
        } 
        .toast{
            position: absolute;
            min-height:28px;
            height:auto;
            white-space:nowrap;
            top:0;
            left:8px;
            z-index:610;
            transform:translateY(-150%);
            line-height:24px;
            background-color: #777;
            color:#Fff;
            font-size:12px;
            padding:2px 8px;
            border-radius:4px;
            opacity:0;
            visibility:hidden;
            transition: .5s;
            &.Open{
                opacity:1;
                visibility:visible;
            }
            :after{
                content:'';
                position: absolute;
                bottom:-8px;
                left:12px;
                border-top:9px solid #777;
                border-left:6px solid transparent;
                border-right:6px solid transparent;
            }
        }
    }
    &>.showBudget{
        margin-left:auto;
        color:#707070;
        font-weight:500;
        text-align:center;
        display: grid;
        grid-template-columns: 20px auto 20px auto;
        grid-template-rows: auto auto;
        grid-template-areas:
            "moneyicon price1 slash price2"
            "null title1 null2 title2";
        >div{
            display:table-cell; 
            vertical-align:bottom;
            letter-spacing:1.4px;
        }
        .moneyicon{
            grid-area: moneyicon;
            font-size:28px;
        }
        .price1{
            min-width:56px;
            grid-area: price1;
            font-size:28px;
        }
        .price2{
            min-width:56px;
            grid-area: price2;
            font-size:28px;
        }
        .slash{
            grid-area: slash;
            font-size:18px;
            line-height:28px;
        }
        .title1{
            grid-area: title1;
            font-size:14px;
            font-weight:400;
        }
        .title2{
            grid-area: title2;
            font-size:14px;
            font-weight:400;
        }
    }
    &>.noSetBudget{
        margin:0 auto;
        /* max-width:210px; */
        display:flex;
        align-items:center;
        padding-bottom:8px;
        padding-left:8px;
        letter-spacing:1px;
        font-size:14px;
        line-height:22px;
        color:#666;
        .toBtn{
            padding:2px 4px;
            margin-bottom:3px;
            margin-left:8px;
            font-size:12px;
            text-decoration:none;
            color:#Fff;
            background-color: #ccc;
            border-radius:12px;
            align-self:flex-end;
        }
    }

`