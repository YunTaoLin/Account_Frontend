import React from "react";
import { Link } from "react-router-dom";
//components
import BudgetBar from "../../../components/Account/Budget";
import Item from "../../../components/Account/ListItem";
//UI
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Add } from "@material-ui/icons";


export default function index(props) {
  const { list, total, selectedDate,budget,overage } = props;
  return (
    <div style={{ height: "100%" }}>
      <ListPage className="pl_8 pr_8 pt_6 ">
        <TotalMoney className="mb_12">
          <span>TWD</span>
          <span>{total}</span>
        </TotalMoney>
        <Swiper
          spaceBetween={24}
          className="SwiperClass"
          freeMode={true}
          watchOverflow={true}
          slidesPerView="auto"
          direction="vertical"
          onSlideChange={() => {}}
          onSwiper={() => {}}
        >
          {list.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Item {...item} />
              </SwiperSlide>
            );
          })}
          {list.length === 0 ? (
            <SwiperSlide style={{textAlign:'center'}}>這天還沒有任何紀錄喔！</SwiperSlide>
          ) : (
            ""
          )}
        </Swiper>
        <Link
          to={{
            pathname: "/Add",
            state: {
              date: selectedDate.toLocaleDateString(),
            },
          }}
          className="addBtn"
        >
          <Add />
        </Link>
      </ListPage>
      <BudgetBar budget={budget} overage={overage} selectedDate={selectedDate}/>
    </div>
  );
}
const TotalMoney = styled.div`
  font-weight: 600;
  color: #666;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  & > span {
    font-size: 44px;
  }
`;

const ListPage = styled.div`
  position: relative;
  height: calc(100% - 76px);
  .addBtn {
    position: absolute;
    z-index: 600;
    bottom: 12px;
    right: 18px;
    width: 56px;
    height: 56px;
    background-color: rgba(100, 100, 100, 0.96);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-shadow: 0 3px 5px 2px rgba(10, 10, 10, 0.25);
  }
`;