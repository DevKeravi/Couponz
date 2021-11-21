import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { placeholdUrl } from "../define";

export interface CouponProp {
  id: string;
  name: string;
  desc?: string;
  serial: string;
  image_link?: string;
  limit?: string;
  qty: number;
  expired: boolean;
  isUsed: boolean;
}

export const CouponListMokup: CouponProp[] = [
  {
    id: "1",
    name: "채가네 슈퍼 쿠폰",
    desc: "채성려리네 집에서 받은 쿠폰",
    serial: "331-20501-2373-12",
    qty: 1,
    image_link: placeholdUrl + "1920x1080",
    expired: false,
    isUsed: false,
  },
  {
    id: "2",
    name: "빕스 스테이크 공짜 쿠폰",
    serial: "3A1-2EFD1-73-B96",
    qty: 1,
    expired: true,
    isUsed: false,
  },
  {
    id: "3",
    name: "사랑사랑사랑한 쿠폰",
    desc: "내사랑이 보내준 쿠폰",
    serial: "50102-329-12",
    qty: 2,
    expired: false,
    isUsed: true,
  },
];

export interface ICouponState {
  couponList: CouponProp[];
  couponDetail: CouponProp;
  getCouponListLoading: boolean;
  getCouponListDone: boolean;
  getCouponListError: any;
  getCouponDetailLoading: boolean;
  getCouponDetailDone: boolean;
  getCouponDetailError: any;
}

const CouponInitialState: CouponProp = {
  id: "0",
  name: "null",
  serial: "null",
  qty: 0,
  expired: true,
  isUsed: true,
};
const initialState: ICouponState = {
  couponList: [CouponInitialState],
  couponDetail: CouponInitialState,
  getCouponListLoading: false,
  getCouponListDone: false,
  getCouponListError: null,
  getCouponDetailLoading: false,
  getCouponDetailDone: false,
  getCouponDetailError: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    GET_COUPON_LIST_REQUEST(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = true;
      state.getCouponListError = null;
    },
    GET_COUPON_LIST_SUCCESS(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = false;
      state.getCouponListError = null;
      // 임시 목업
      state.couponList = CouponListMokup;
    },
    GET_COUPON_LIST_FAILURE(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = false;
      state.getCouponListError = action.payload;
    },
    GET_COUPON_DETAIL_REQUEST(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = true;
      state.getCouponDetailError = null;
    },
    GET_COUPON_DETAIL_SUCCESS(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = false;
      state.getCouponDetailError = null;
      //목업
      state.couponDetail = CouponListMokup[action.payload - 1];
    },
    GET_COUPON_DETAIL_FAILURE(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = false;
      state.getCouponDetailError = action.payload;
    },
  },
});

const { reducer, actions } = couponSlice;

export const {
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
  GET_COUPON_LIST_FAILURE,
  GET_COUPON_DETAIL_REQUEST,
  GET_COUPON_DETAIL_SUCCESS,
  GET_COUPON_DETAIL_FAILURE,
} = actions;
export default reducer;
