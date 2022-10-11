import Airport from "../images/busIcon/busicon_airport.png";
import DownTown from "../images/busIcon/busicon_downtown.png";
import Contryside from "../images/busIcon/busicon_contryside.png";

export const busTypeSelecter = (Type) => {
  let busType =
    Type.includes("시내") && Type.indexOf("직행") === -1
      ? "downTown"
      : Type.includes("시외")
      ? "contryside"
      : "airport";

  switch (busType) {
    case "downTown":
      return DownTown;
    case "contryside":
      return Contryside;
    case "airport":
      return Airport;

    default:
      return DownTown;
  }
};
