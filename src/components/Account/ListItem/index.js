import React from 'react'
import styled from 'styled-components';
import incomeClassifyList from "../../../JS/incomeClassify";
import expenseClassifyList from "../../../JS/expenseClassify";

import {ControlPointDuplicate ,AttachMoney} from "@material-ui/icons";
const Item = styled.div`
    display:flex;
    height:38px;
    width:100%;
    color:#fff;
    align-items:center;
    padding:0 10px;
    box-sizing:border-box;
    &.income{
        background-color: #79B1AC;
    }
    &.expense{
        background-color: #D3654A;
    }
    >.icon{
        width:40px;
    }
    >.price{
        margin-left:auto;
    }
`;





export default function index({type,price,classify}) {
    const getIcon= (classify)=>{
        let classifyObj = null
        if(type==='01'){
            classifyObj = incomeClassifyList.find(item=> item.clssifyName === classify)
        }else if(type==='02'){
            classifyObj = expenseClassifyList.find(item=> item.clssifyName === classify)
        }
        let Icon= classifyObj? classifyObj.icon : (type==='01'?ControlPointDuplicate:AttachMoney)
        return <Icon></Icon>
    }




    return (
        <Item className={type==='01'? 'income' : 'expense'}>
            <div className="icon">{getIcon(classify)}</div>
            <div className="classify">{classify}</div>
            <div className="price">${type==='01'?'':' -'}&nbsp;{price}</div>
        </Item>
    )
}
