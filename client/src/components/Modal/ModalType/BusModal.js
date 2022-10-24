import React, { useState } from "react";
import styles from "./BusModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as openApi from "../../../api/openAPI";
import { LongBarButton } from "../../../styles/LongBar";
import { setBusData } from "../../../modules/busReducer";
import * as setApi from "../../../api/setDataAPI";
const BusModal = (props) => {
  const [busStationName, setBusStationName] = useState("");
  const [busStationStorage, setBusStationStorage] = useState([]);
  const [busRouteStorage, setBusRouteStorage] = useState([]);
  const [stationLoading, setStationLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(true);
  const [stationSelect, setStationSelect] = useState("");
  const [routeSelect, setRouteSelect] = useState("");
  const [searchGuide, setSearchGuide] = useState("검색어를 입력해주세요.");
  const User = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();

  const busStationSearch = async (e, stationName) => {
    e.preventDefault();
    setStationLoading(true);
    try {
      if (stationName !== "") {
        let stationSearchRes = await openApi.busStationSearchRequest(
          stationName
        );
        if (
          stationSearchRes.data.response.msgHeader.resultMessage._text ===
          "결과가 존재하지 않습니다."
        ) {
          setSearchGuide("검색 결과가 존재하지 않습니다.");
          return;
        } else {
          setSearchGuide("");
        }
        setBusStationStorage(
          stationSearchRes.data.response.msgBody.busStationList
        );
        setStationLoading(false);
      } else {
        setSearchGuide("검색어를 입력해주세요.");
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const busRouteSearch = async (stationId) => {
    setRouteLoading(true);
    let RouteSearchRes = await openApi.busRouteSearchRequest(stationId);
    if (
      RouteSearchRes.data.response.msgHeader.resultMessage._text ===
      "정상적으로 처리되었습니다."
    ) {
      setBusRouteStorage(RouteSearchRes.data.response.msgBody.busRouteList);
      setRouteLoading(false);
    } else {
      setSearchGuide(
        "현재 버스경로 데이터에 문제가 생겼습니다. 다시 시도해주세요"
      );
    }
  };

  const setBusItem = async (
    userId,
    stationId,
    routeId,
    staOrder,
    routeType,
    routeName
  ) => {
    let busDataRes = await openApi.busDataRequest(stationId, routeId, staOrder);
    if (
      busDataRes.data.response.msgHeader.resultMessage._text ===
      "정상적으로 처리되었습니다."
    ) {
      busDataRes.data.response.msgBody.busArrivalItem.routeType = routeType;
      busDataRes.data.response.msgBody.busArrivalItem.routeName = routeName;
      dispatch(setBusData(busDataRes.data.response.msgBody.busArrivalItem));
      let routeRes = await setApi.setbusRouteDB(
        userId,
        stationId,
        routeId,
        staOrder,
        routeType,
        routeName
      );
      props.modalStateToggle();
    } else if (
      busDataRes.data.response.msgHeader.resultMessage._text ===
      "결과가 존재하지 않습니다."
    ) {
      alert("현재 운행중인 차량이 없습니다.");
    } else {
      alert("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.BusModal}>
      <ul className={styles.stationSearchArea}>
        <li>
          <h4>버스정류장 검색</h4>
        </li>
        <li>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                busStationSearch(e, busStationName);
              }
            }}
          >
            <input
              type="text"
              onChange={(e) => setBusStationName(e.target.value)}
            />
            <button onClick={(e) => busStationSearch(e, busStationName)}>
              검색
            </button>
          </form>
        </li>
        <li>
          <ul
            className={styles.stationList}
            style={stationLoading ? { display: "none" } : { display: "block" }}
          >
            {stationLoading
              ? ""
              : busStationStorage.map((current, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={(e) => {
                          busRouteSearch(current.stationId._text);
                          setStationSelect(current.stationId._text);
                        }}
                      >
                        {current.stationName._text}
                      </button>
                    </li>
                  );
                })}
          </ul>
        </li>
        <li>
          <ul
            className={styles.routeSearchArea}
            style={routeLoading ? { display: "none" } : { display: "block" }}
          >
            <li>
              <h4 className={styles.routeHeader}>버스목록</h4>
            </li>
            <li>
              <ul className={styles.routeList}>
                {routeLoading && stationLoading
                  ? ""
                  : busRouteStorage.map((current, index) => {
                      return (
                        <li key={index}>
                          <button
                            className={styles.routeButton}
                            onClick={() =>
                              setRouteSelect([
                                current.routeId._text,
                                current.staOrder._text,
                                current.routeTypeName._text,
                                current.routeName._text,
                              ])
                            }
                          >
                            {current.routeName._text}
                          </button>
                        </li>
                      );
                    })}
              </ul>
            </li>
          </ul>
        </li>
        {stationSelect && routeSelect ? (
          <LongBarButton
            className={styles.saveButton}
            onClick={() =>
              setBusItem(
                User[0].id,
                stationSelect,
                routeSelect[0],
                routeSelect[1],
                routeSelect[2],
                routeSelect[3]
              )
            }
          >
            저장
          </LongBarButton>
        ) : (
          ""
        )}
      </ul>
      <p className={styles.guide}>{searchGuide}</p>
    </div>
  );
};

export default BusModal;
