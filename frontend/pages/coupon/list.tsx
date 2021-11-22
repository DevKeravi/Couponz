import {
  GET_COUPON_LIST_FAILURE,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
} from "../../reducers/coupon";
import CouponList from "../../src/components/CouponList";
import wrapper from "../../store/configureStore";

const couponList = () => {
  return (
    <>
      <CouponList />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res, req, params }) => {
      try {
        store.dispatch({ type: GET_COUPON_LIST_REQUEST });
        //실제 API 콜
        store.dispatch({ type: GET_COUPON_LIST_SUCCESS });
      } catch (error) {
        store.dispatch({ type: GET_COUPON_LIST_FAILURE, payload: error });
      }

      return {
        props: {},
      };
    }
);
export default couponList;
