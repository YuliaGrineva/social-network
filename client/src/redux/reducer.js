import { combineReducers } from "redux";
import {friendsAndWannabesReducer} from "./friendsAndWannabes/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
});


export default rootReducer;