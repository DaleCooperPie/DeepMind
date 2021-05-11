import waiting from "../../assets/tea-cup.svg";
import "./waitingForApiResponse.css";

/** A component shown when we are waiting for the API response. */ 
export function WaitingForApiResponse() {
  return (
    <div className="waiting-container">
      <img className="waiting-image" src={waiting} alt="" role="presentation" />
      <span> We are waiting for the API response. Sometimes it takes a while. May I suggest a cuppa?</span>
    </div>
  );
}
