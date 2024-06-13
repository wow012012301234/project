import { RevolvingDot, ThreeCircles } from "react-loader-spinner";
import "./loading.css";

export default function Loading(props) {
  return (
    <>
      <div className="cont   p-1 p-md-3 p-lg-5 justify-content-center d-flex align-items-center">
        <div className="loadingscreen bg-white p-5  d-flex  flex-column  justify-content-center align-items-center  rounded-3 h-auto col-lg-8 col-10">
          <ThreeCircles
            visible={true}
            height="120"
            width="120"
            color="rgb(55, 98, 163)"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className="mt-5 sataus fs-4  fw-bold  gradient__text">
            <span className=" fs-3 gradient__text  fw-bold" > Status : </span> {props.status}%
          </p>
        </div>
      </div>
    </>
  );
}

export function LoadingNetwork() {
  return (
    <>
      <div className="cont   p-1 p-md-3 p-lg-5 justify-content-center d-flex align-items-center">
        <div className="loadingscreen bg-white p-5  d-flex  flex-column  justify-content-center align-items-center  rounded-3 h-auto col-lg-8 col-10">
          <RevolvingDot
            visible={true}
            height="120"
            width="120"
            color="rgb(55, 98, 163)"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p className="mt-5 sataus fs-4  fw-bold  gradient__text">
            <span className=" fs-3 gradient__text  fw-bold" > Scanning ... </span> 
          </p>
        </div>
      </div>
    </>
  );
}
