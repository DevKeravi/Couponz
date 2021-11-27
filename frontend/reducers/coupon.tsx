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
  isPresent: boolean;
}
export interface ICouponState {
  couponList: CouponProp[];
  couponDetail: CouponProp;
  getCouponListLoading: boolean;
  getCouponListDone: boolean;
  getCouponListError: any;
  getCouponDetailLoading: boolean;
  getCouponDetailDone: boolean;
  getCouponDetailError: any;
  addCouponLoading: boolean;
  addCouponDone: boolean;
  addCouponError: any;
  editCouponLoading: boolean;
  editCouponDone: boolean;
  editCouponError: any;
  deleteCouponLoading: boolean;
  deleteCouponDone: boolean;
  deleteCouponError: any;
}

const CouponInitialState: CouponProp = {
  id: "0",
  name: "null",
  serial: "null",
  qty: 0,
  expired: true,
  isUsed: true,
  isPresent: true,
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
  addCouponLoading: false,
  addCouponDone: false,
  addCouponError: null,
  editCouponLoading: false,
  editCouponDone: false,
  editCouponError: null,
  deleteCouponLoading: false,
  deleteCouponDone: false,
  deleteCouponError: null,
};

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
    isPresent: false,
    limit: "2021-12-04",
  },
  {
    id: "2",
    name: "빕스 스테이크 공짜 쿠폰",
    serial: "3A1-2EFD1-73-B96",
    qty: 1,
    expired: true,
    isUsed: false,
    isPresent: true,
    limit: "2022-04-04",
  },
  {
    id: "3",
    name: "사랑사랑사랑한 쿠폰",
    desc: "내사랑이 보내준 쿠폰",
    serial: "50102-329-12",
    qty: 2,
    expired: false,
    isUsed: true,
    isPresent: false,
  },
];

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    GET_COUPON_LIST_REQUEST(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = true;
      state.getCouponListError = null;
      state.getCouponListDone = false;
    },
    GET_COUPON_LIST_SUCCESS(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = false;
      state.getCouponListError = null;
      state.getCouponListDone = true;
      // 임시 목업
      state.couponList = CouponListMokup;
    },
    GET_COUPON_LIST_FAILURE(state: ICouponState, action: AnyAction) {
      state.getCouponListLoading = false;
      state.getCouponListError = action.payload;
    },
    GET_COUPON_DETAIL_REQUEST(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = true;
      state.getCouponDetailDone = false;
      state.getCouponDetailError = null;
    },
    GET_COUPON_DETAIL_SUCCESS(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = false;
      state.getCouponDetailError = null;
      state.getCouponDetailDone = true;
      //목업
      state.couponDetail = CouponListMokup[action.payload - 1];
    },
    GET_COUPON_DETAIL_FAILURE(state: ICouponState, action: AnyAction) {
      state.getCouponDetailLoading = false;
      state.getCouponDetailError = action.payload;
    },
    ADD_COUPON_REQUEST(state: ICouponState, action: AnyAction) {
      state.addCouponLoading = true;
      state.addCouponError = null;
      state.addCouponDone = false;
    },
    ADD_COUPON_SUCCESS(state: ICouponState, action: AnyAction) {
      state.addCouponLoading = false;
      state.addCouponError = null;
      state.addCouponDone = true;
      state.couponList.push(action.payload);
    },
    ADD_COUPON_FAILURE(state: ICouponState, action: AnyAction) {
      state.addCouponLoading = false;
      state.addCouponError = action.payload;
    },
    EDIT_COUPON_REQUEST(state: ICouponState, action: AnyAction) {
      state.editCouponLoading = true;
      state.editCouponDone = false;
      state.editCouponError = null;
    },
    EDIT_COUPON_SUCCESS(state: ICouponState, action: AnyAction) {
      state.editCouponLoading = false;
      state.editCouponDone = true;
      state.editCouponError = null;

      const idx = state.couponList.findIndex((coupon) => {
        return coupon.id === action.payload.id;
      });

      state.couponList[idx] = action.payload;
    },
    EDIT_COUPON_FAILURE(state: ICouponState, action: AnyAction) {
      state.editCouponLoading = false;
      state.editCouponError = action.payload;
    },
    DELETE_COUPON_REQUEST(state: ICouponState, action: AnyAction) {
      state.deleteCouponLoading = true;
      state.deleteCouponDone = false;
      state.deleteCouponError = null;
    },
    DELETE_COUPON_SUCCESS(state: ICouponState, action: AnyAction) {
      state.deleteCouponLoading = false;
      state.deleteCouponDone = true;
      state.deleteCouponError = null;

      const idx = state.couponList.findIndex((coupon) => {
        return coupon.id === action.payload.id;
      });
      state.couponList.splice(idx, 1);
    },
    DELETE_COUPON_FAILURE(state: ICouponState, action: AnyAction) {
      state.deleteCouponLoading = false;
      state.deleteCouponError = action.payload;
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
  ADD_COUPON_REQUEST,
  ADD_COUPON_SUCCESS,
  ADD_COUPON_FAILURE,
  EDIT_COUPON_REQUEST,
  EDIT_COUPON_SUCCESS,
  EDIT_COUPON_FAILURE,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILURE,
} = actions;
export default reducer;
