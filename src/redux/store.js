import { applyMiddleware } from "redux";
import accountReducer from "./account/reducer";
import navbarReducer from "./closeNavbar/reducer";
import memberReducer from "./member/reducer";
import loadingReducer from "./loading/reducer";
import { configureStore } from "@reduxjs/toolkit";
//引入redux-thunk
import thunk from "redux-thunk";

const store = configureStore(
  {
    reducer: {
      accountData: accountReducer,
      navbarStatus: navbarReducer,
      memberData:memberReducer,
      loadingStatus:loadingReducer
    },
  },
  applyMiddleware(thunk)
);

export default store;
