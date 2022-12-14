import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as initApi from "../api/initDataAPI";
import * as openApi from "../api/openAPI";
import { setBusData, resetBusData } from "../modules/busReducer";

const useBusInitData = (loadingFunc) => {
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const getBusInitData = async (loadingFunc) => {
    try {
      let busInitData = await initApi.setBusInitData(User[0].id);
      dispatch(resetBusData([]));
      busInitData.data.forEach(async (current) => {
        let busRes = await openApi.busDataRequest(
          current.stationId,
          current.routeId,
          current.staOrder
        );
        if (
          busRes.data.response.msgHeader.resultMessage._text ===
          "정상적으로 처리되었습니다."
        ) {
          busRes.data.response.msgBody.busArrivalItem.routeType =
            current.routeType;
          busRes.data.response.msgBody.busArrivalItem.routeName =
            current.routeName;
          dispatch(setBusData(busRes.data.response.msgBody.busArrivalItem));
        }
      });
      loadingFunc(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBusInitData(loadingFunc);
  }, []);
};

export default useBusInitData;
