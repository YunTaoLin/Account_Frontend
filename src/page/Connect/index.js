import React from "react";
import styled from "styled-components";
import { $color_dark } from "../../scss/styled";
import { Facebook, GitHub } from "@material-ui/icons";
//redux
import { connect } from "react-redux";
import img from "../../asset/pexels-photo-374016.jpeg";
const Index = () => {
  return (
    <div className="mainPage">
      <div className="header">
        <div className="header_main">聯絡開發者</div>
      </div>
      <div className="main shadow_t_inset">
        <Profile>
          <div className="pic">
            <img src={img} alt="" />
          </div>
          <div className="detail">
            <div className="detail_item">
              <div className="tilte">開發者</div>
              <div className="content">YunTaoLin</div>
            </div>
            <div className="detail_item">
              <div className="tilte">介面設計</div>
              <div className="content">方方、莉涵、Brian Lee</div>
            </div>
            <div className="detail_item">
              <div className="tilte">聯絡時間</div>
              <div className="content">週一至週五 09:00~18:30</div>
            </div>
            <div className="detail_item">
              <div className="tilte">電子信箱</div>
              <div className="content">
                <a href="joe.lin456919@gmail.com.tw">
                  joe.lin456919@gmail.com.tw
                </a>
              </div>
            </div>
            <div className="detail_item">
              <div className="tilte">參考</div>
              <div className="content">
                <a href="https://github.com/YunTaoLin">
                  <GitHub style={{ color: `#000` }} />
                </a>
              </div>
            </div>
          </div>
        </Profile>
      </div>
    </div>
  );
};

export default connect((state) => ({ data: state }), {})(Index);
const Profile = styled.div`
  width: 100%;
  .pic {
    width: 100%;
    height: 210px;
    background-color: #ddd;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top left;
    }
  }
  .detail {
    width: 100%;
    padding: 0 25px;
    .detail_item {
      display: flex;
      height: 44px;
      width: 100%;
      line-height: 44px;
      color: ${$color_dark};
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      padding: 0 12px;
      .tilte {
        width: 76px;
      }
      .content {
        padding-left: 4px;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > a {
          display: flex;
          align-items: center;
          color: ${$color_dark};
          text-decoration: none;
        }
      }
    }
  }
`;
