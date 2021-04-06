import React  from "react";
import styled from "styled-components";
import { $color_dark } from "../../scss/styled";
//redux
import { connect } from "react-redux";
import moment from "moment";
import cookie from 'react-cookies';

require('twix');
const Index = (props) => {
  let {memberData} = props.data
  console.log(props)
  const getExperience = ()=>{
    let t = moment(memberData.creDate).twix(new Date());
    let days=t.count('days')
    return {
      days, 
      level: days>300? '理財大神' :　(days>100? '理財老手': (days>20? '理財菁英' :'理財初心者'))
    }
  }
  const showId = ()=>{
    try{
      let show = [0,0,0,0,0,0]
      let sourceStr = memberData.id.toString()
      let sourceArray = [...sourceStr]
      sourceArray.forEach((str,index)=>{
        show[5-index]=str
      })
    return show.join('')
    }catch{
      return ''
    }
  }
  const headimg = cookie.load('headimg') || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNywizXm70zUNIBACKwirWyEVpbK5JA8U8uw&usqp=CAU"
  return (
    (
      <div className="mainPage">
        <div className="header">
          <div className="header_main">個人資料</div>
        </div>
        <div className="main shadow_t_inset">
          <Profile>
            <div className="info">
              <div className="name">
                <div>{memberData.name}</div>
                <div className='memberId'>會員編號：{showId()}</div>
              </div>
              <div className="pic">
                <img src={headimg} alt=""/>
              </div>
            </div>
            <div className="detail">
              <div className="detail_item">
                <div className="tilte">綁定狀態：</div>
                <div className="content">由Line登入</div>
              </div>
              <div className="detail_item">
                <div className="tilte">創建日期：</div>
                <div className="content">{moment(memberData.creDate).format('YYYY/MM/DD')}</div>
              </div>
              <div className="detail_item">
                <div className="tilte">每月預算：</div>
                <div className="content">{memberData.budget!==0? `${memberData.budget}元`:'未設定'}</div>
              </div>
              <div className="detail_item">
                <div className="tilte">會員等級：</div>
                <div className="content">{getExperience().level}</div>
              </div>
            </div>
            <div className="achievement">
              <div className="title">
                累計記帳天數：
              </div>
              <div className="content">
                <span>{getExperience().days}</span><div>天</div>
              </div>
            </div>
          </Profile>
        </div>
      </div>
    )
  )
}


export default connect((state) => ({ data: state }), {})(Index);
const Profile = styled.div`
  width:100%;
  padding:35px 25px;
  .info{
    width:100%;
    display:flex;
    justify-content:space-between;
    .name{
      padding-top:12px;
      font-weight:700;
      font-size:30px;
      color:#000;
      .memberId{
        padding-top:12px;
        padding-left:4px;
        font-size:12px;
        font-weight:500;
        color:${$color_dark};
      }
    }
    .pic{
      width:95px;
      height:95px;
      border-radius:50%;
      overflow:hidden;
      background-color: #DDD;
      >img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
  }
  .detail{
    width:100%;
    padding-top:12px;
    .detail_item{
      display:flex;
      height:44px;
      width:100%;
      line-height: 44px;
      color:${$color_dark};
      font-size:14px;
      border-bottom:1px solid #ddd;
      padding: 0 12px;
      .tilte{
        width:76px;
      }
      .content{
        padding-left:4px;
        flex-grow:1;
      }
    }
  }
  .achievement{
    display:flex;
    flex-direction:column;
    padding-top:10%;
    .title{
      width:100%;
      font-size:18px;
      padding-left:20px;
      color:${ $color_dark};
    }
    .content{
      width:100%;
      padding-top:12px;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      font-size:14px;
      transform:translateX(14px);
      span{
        font-weight: 500;
        font-size:66px;
        color:${ $color_dark};
      }
      div{
        padding-left:12px;
      }
    }
  }

`


