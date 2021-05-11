import { Agent } from "../Api";
import { GetAverageScore } from "../tools";
import { Link } from "react-router-dom";
import back from "../assets/left-arrow.svg"
import "./CompareAgentsPage.css";

interface CompareAgentsPageProps {
  agentsForCompare: Agent[];
}

/** Page comparing several agents. Can gracefully handle more than 2 agents. */
export function CompareAgentsPage(props: CompareAgentsPageProps) {
  return (
    <>
      <div className="back-container">
        <img className="back-icon" src={back} alt="" role="presentation" />
        <Link className="back-link" to="/home">
          BACK
        </Link>
      </div>
      <div className="compare-results-container">
        <CompareRow
          header="Name"
          compareValues={props.agentsForCompare.map((agent) => agent.name)}
        />
        <CompareRow
          header="Average memory score"
          compareValues={props.agentsForCompare.map((agent) =>
            GetAverageScore(agent.tasks, "memory")
          )}
        />
        <CompareRow
          header="Average planning score"
          compareValues={props.agentsForCompare.map((agent) =>
            GetAverageScore(agent.tasks, "planning")
          )}
        />
        <CompareRow
          header="Average logic score"
          compareValues={props.agentsForCompare.map((agent) =>
            GetAverageScore(agent.tasks, "logic")
          )}
        />
      </div>
    </>
  );
}

interface CompareRowProps {
  /** Describes, which measurement is used for comparison in this row. */
  header: string;
  compareValues: number[] | string[];
}

/** A single row with a header and compared values. */
export function CompareRow(props: CompareRowProps) {
  return (
    <div className="compare-row">
      <span className="compare-row-header">{props.header}</span>
      {props.compareValues.map((value: number | string, i: number) => (
        <span className="compare-value" key={i}>
          {value}
        </span>
      ))}
    </div>
  );
}
