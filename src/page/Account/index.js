import React, { Component } from "react";
import { connect } from "react-redux";
import { UPDATE_NAVBAR } from "../../redux/closeNavbar/action";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import moment from "moment";
import "./index.scss";
// import { useLocation  } from 'react-router-dom'
//自訂組件
import List from "./List";
class index extends Component {
  state = {
    selectedDate: this.props.location.state
      ? new Date(this.props.location.state?.date)
      : new Date(),
    OpenPick: false,
    overage: 0,
  };
  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  PickHandler = (type = true) => {
    this.setState({ OpenPick: type });
    this.props.UPDATE_NAVBAR(!type);
  };
  Header_main = () => {
    const { selectedDate } = this.state;
    return (
      <div className="showTime" onClick={this.PickHandler}>
        {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月
        {selectedDate.getDate()}日
        <ArrowDropDownIcon className="showTime_icon" />
      </div>
    );
  };

  render() {
    const list = this.props.data.accountData;
    const budget = this.props.data.memberData.budget;
    //日期過濾後帳務列表
    const filterAccountList = list.filter(
      (item) =>
        new Date(item.date).toLocaleDateString() ===
        new Date(this.state.selectedDate).toLocaleDateString()
    );
    //日期過濾後當天收支結算
    const dayTotal = filterAccountList.reduce(
      (accumulator, currentValue) =>
        currentValue.type === "01"
          ? accumulator + currentValue.price
          : accumulator - currentValue.price,
      0
    );
    //當月預算剩餘
    let array = this.props.data.accountData.filter((item) => {
      let begain = moment(this.state.selectedDate).startOf("month");
      let end = moment(this.state.selectedDate).endOf("month");
      return (
        moment(item.date).isSameOrAfter(begain, "date") &&
        moment(item.date).isSameOrBefore(end, "date")
      );
    });
    const overage = array.reduce(
      (accumulator, currentValue) =>
        currentValue.type === "01"
          ? accumulator + currentValue.price
          : accumulator - currentValue.price,
      0
    );

    return (
      <div className="mainPage" id="Account">
        <div className="header">
          <div className="header_main">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                TextFieldComponent={this.Header_main}
                open={Boolean(this.state.OpenPick)}
                onOpen={() => this.PickHandler(true)}
                onClose={() => this.PickHandler(false)}
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="main shadow_t_inset">
          <List
            list={filterAccountList}
            total={dayTotal}
            selectedDate={this.state.selectedDate}
            budget={budget}
            overage={overage}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ data: state }), {
  UPDATE_NAVBAR,
})(index);
