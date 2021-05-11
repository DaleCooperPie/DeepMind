import error from "../../assets/error.svg";
import "./error.css";

interface ErrorProps {
  errorText: string;
}

/** A component shown when the API returned an error response. */ 
export function Error(props: ErrorProps) {
  return (
    <div className="error">
      <img className="error-image" src={error} alt="" role="presentation" />
      <span>Oh no! </span>
        {props.errorText}
      <p> Please refresh the page.</p>
    </div>
  );
}
