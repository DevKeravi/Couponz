import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import coupon, { ICouponState } from "./coupon";

export type State = {
  coupon: ICouponState;
};

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        coupon,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
