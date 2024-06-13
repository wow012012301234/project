import { RiScan2Line } from "react-icons/ri";
export default function SearchNewScan() {
  return (
    <>
    
      <div className="input-group mb-3 px-4 py-1">
        <input
          type="text"
          className="form-control "
          placeholder="Enter Ip or Hostname or url for Scanning"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn download-btn"
          type="button"
          id="button-addon2"
        >
            <RiScan2Line />
         <span> New Scan</span> 
        </button>
      </div>
    </>
  );
}
