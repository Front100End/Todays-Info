import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateBuses.module.scss";
import BusIamge from "../../images/ico_bus.png";
import { busTypeSelecter } from "../../functions/busTypeSelecter";
import refreshIcon from "../../images/refresh_icon.png";
import * as initApi from "../../api/initDataAPI";
import * as openApi from "../../api/openAPI";
import { setBusData, resetBusData } from "../../modules/busReducer";
import { deleteBusData } from "../../functions/deleteItems";

const CreateBuses = (props) => {
  const [loading, setLoading] = useState(true);
  const [busArray, setBusArray] = useState([]);
  const busData = useSelector((state) => state.busReducer.busData);
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  const refreshBusItem = async () => {
    setLoading(true);
    try {
      let busInitData = await initApi.setBusInitData(User[0].id);
      dispatch(resetBusData([]));
      busInitData.data.forEach(async (current) => {
        console.log(busInitData.data);
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
            current.routeType; // type data 추가
          busRes.data.response.msgBody.busArrivalItem.routeName =
            current.routeName; // routeName 추가
          dispatch(setBusData(busRes.data.response.msgBody.busArrivalItem));
        }
      });
      setLoading(false);
    } catch (err) {
      console.log(`err : front ${err}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    setBusArray(busData);
    setLoading(false);
  }, [busData]);
  return (
    <ul className={styles.CreateBuses}>
      <li>
        <div>
          <img src={BusIamge} alt="" />
          <h2>버스</h2>
        </div>
        <button onClick={() => refreshBusItem()}>
          <img src={refreshIcon} alt="arrows-rotate-solid img problem" />
        </button>
      </li>
      <li>
        <ul>
          {loading === true
            ? ""
            : busArray.map((current, index) => {
                return (
                  <li key={index}>
                    <div className={styles.busInfo}>
                      <img
                        src={busTypeSelecter(current.routeType)}
                        alt="busType func or img error"
                      />
                      <div>
                        <em>{current.routeName}</em>
                        {current.plateNo1.length !== 0 ? (
                          <p>{current.plateNo1._text}</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className={styles.busArrTimeArea}>
                      {current.predictTime1._text.length !== 0 ? (
                        <div>
                          <p>
                            <em>{current.predictTime1._text}분후</em>
                            <span>{current.locationNo1._text}번째전</span>
                            {current.remainSeatCnt1._text !== "-1" ? (
                              <span>{current.remainSeatCnt1._text}좌석</span>
                            ) : (
                              ""
                            )}
                          </p>
                          {current.predictTime2._text.length !== 0 ? (
                            <p>
                              <em>{current.predictTime2._text}분후</em>
                              <span>{current.locationNo2._text}번째전</span>
                              {current.remainSeatCnt2._text !== "-1" ? (
                                <span>{current.remainSeatCnt2._text}좌석</span>
                              ) : (
                                ""
                              )}
                            </p>
                          ) : (
                            <span>도착정보없음...</span>
                          )}
                        </div>
                      ) : (
                        <i>현재 운행중인 버스가 없습니다.</i>
                      )}
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        deleteBusData(
                          User[0].id,
                          current.stationId._text,
                          dispatch
                        );
                      }}
                    >
                      X
                    </button>
                  </li>
                );
              })}
        </ul>
      </li>
    </ul>
  );
};

export default CreateBuses;
