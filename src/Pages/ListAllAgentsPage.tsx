import { Agent } from "../Api";
import { Button } from "../components/button/button";
import { ShowAgentOverviewButton } from "../components/agentOverview/agentOverview";
import { Link } from "react-router-dom";
import "./ListAllAgentsPage.css";

interface ListAllAgentsPageProps {
  agents: readonly Agent[];
  agentsForCompare: Agent[];
  onAgentAddToCompare: (agent: Agent) => void;
  onAgentRemoveFromCompare: (agent: Agent) => void;
}

/** A page displaying all available agents.*/
export function ListAllAgentsPage(props: ListAllAgentsPageProps) {
  const comparisonFull = props.agentsForCompare.length === 2;

  return (
    <div className="content-container">
      <h1 className="header">Learn about different Deep Mind agents</h1>
      {props.agents.length !== 0 && (
        <>
          <div className="overviews-container">
            {props.agents.map((agent, i) => (
              <div className="overview-tile" key={i}>
                <div>{agent.name}</div>
                <div className="button-container">
                  <ShowAgentOverviewButton agent={agent} />
                  <AddRemoveFromComparisonButton
                    agentAlreadyInComparison={props.agentsForCompare.includes(
                      agent
                    )}
                    comparisonFull={comparisonFull}
                    onAdd={() => props.onAgentAddToCompare(agent)}
                    onRemove={() => props.onAgentRemoveFromCompare(agent)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="compare-container">
            <span className="messages">
              <span>
                {props.agentsForCompare.length !== 0
                  ? `Agents in comparison: ${props.agentsForCompare
                      .map((agent) => agent.name)
                      .join(", ")}.`
                  : "No agents added to comparison."}
              </span>
              {!comparisonFull && (
                <span>Please add more agents to enable comparison.</span>
              )}
            </span>
            <Link
              className={`link-button${comparisonFull ? "" : " disabled-link"}`}
              to="/compare"
              aria-label="Go to the page, comparing selected agents"
              onClick={comparisonFull ? () => {} : (e) => e.preventDefault()}
            >
              COMPARE
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

interface AddRemoveFromComparisonButtonProps {
  agentAlreadyInComparison: boolean;
  comparisonFull: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

/** Button handling removal or addition of an agent to the array of agents, which can be compared. */
export function AddRemoveFromComparisonButton(
  props: AddRemoveFromComparisonButtonProps
) {
  return (
    <>
      {props.agentAlreadyInComparison && (
        <Button onClick={props.onRemove} buttonText="REMOVE FROM COMPARE" />
      )}
      {!props.agentAlreadyInComparison && (
        <Button
          disabled={props.comparisonFull}
          onClick={props.onAdd}
          buttonText="ADD TO COMPARE"
        />
      )}
    </>
  );
}
