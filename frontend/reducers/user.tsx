import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { placeholdUrl } from "../define";

export interface userProp {
  id: string;
  name: string;
  avatar_url?: string;
}

export interface IUserState {
  userData: userProp;
  friendList: userProp[];
  getUserDataLoading: boolean;
  getUserDataDone: boolean;
  getUserDataError: any;
  userLoginLoading: boolean;
  userLoginDone: boolean;
  userLoginError: any;
}

const userInitialState: IUserState = {
  userData: {
    id: "anonymous@keravi.com",
    name: "annoymous",
    avatar_url: "",
  },
  friendList: [],
  getUserDataLoading: false,
  getUserDataDone: false,
  getUserDataError: null,
  userLoginLoading: false,
  userLoginDone: false,
  userLoginError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    GET_USER_DATA_REQUEST(state: IUserState, action: AnyAction) {
      state.getUserDataLoading = true;
      state.getUserDataError = false;
    },
    GET_USER_DATA_SUCCESS(state: IUserState, action: AnyAction) {
      state.getUserDataLoading = false;
      state.getUserDataDone = true;
      state.userData = action.payload;
    },
    GET_USER_DATA_FAILURE(state: IUserState, action: AnyAction) {
      state.getUserDataLoading = false;
      state.getUserDataError = action.payload;
    },
    USER_LOGIN_REQUEST(state: IUserState, action: AnyAction) {
      state.userLoginLoading = true;
      state.userLoginError = false;
    },
    USER_LOGIN_SUCCESS(state: IUserState, action: AnyAction) {
      state.userLoginLoading = false;
      state.userLoginDone = true;
      state.userData = action.payload;
    },
    USER_LOGIN_FAILURE(state: IUserState, action: AnyAction) {
      state.userLoginLoading = false;
      state.userLoginError = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} = actions;
export default reducer;
