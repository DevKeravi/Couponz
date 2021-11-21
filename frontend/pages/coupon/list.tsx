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
      return {
        props: {},
      };
    }
);
export default couponList;
