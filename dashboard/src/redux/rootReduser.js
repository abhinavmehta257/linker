import { combineReducers } from "redux";
import dataReducer from "./data/dataRedusers";
import linksReducer from "./links/linksReducer";
import profileReducer from "./profile/profileRedusers";
import authReducer from "./auth/authRedusers";

const rootReducer =  combineReducers({
    data: dataReducer,
    links: linksReducer,
    profile: profileReducer,
    auth: authReducer
});

export default rootReducer;