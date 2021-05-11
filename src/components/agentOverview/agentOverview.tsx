import * as React from "react";
import { Agent } from "../../Api";
import ai from "../../assets/ai.svg";
import { GetAverageScore } from "../../tools";
import * as Modal from "../modal/modal";
import { Button } from "../button/button";

import "./agentOverview.css";

interface AgentOverviewProps {
  agent: Agent;
}

/** A component presenting some basic overview information (description and average task scores) about an agent.*/
function AgentOverview(props: AgentOverviewProps) {
  return (
    <div className="agent-overview">
      <img src={ai} className="ai-icon" alt="" role="presentation" />
      <div className="name">{props.agent.name}</div>
      <div className="description">{props.agent.description}</div>
      <p className="scores">
        Average memory score: {GetAverageScore(props.agent.tasks, "memory")}
        <br />
        Average planning score: {GetAverageScore(props.agent.tasks, "planning")}
        <br />
        Average logic score: {GetAverageScore(props.agent.tasks, "logic")}
        <br />
      </p>
    </div>
  );
}

/** A button, opening a modal, containing overview information about an agent. */
export function ShowAgentOverviewButton(props: AgentOverviewProps) {
  const showMoreButton = React.useRef<HTMLButtonElement>(null);
  const { isOpen, open, close } = Modal.useModal();

  return (
    <>
      <Button
        buttonRef={showMoreButton}
        onClick={open}
        ariaLabel={`Additional information about the ${props.agent.name} agent`}
        buttonText="LEARN MORE"
        className="learn-more-button"
      />
      <Modal.Modal
        returnFocusToElement={showMoreButton.current!}
        isOpen={isOpen}
        close={close}
        ariaLabel={`Additional information about the ${props.agent.name} agent`}
      >
        <AgentOverview agent={props.agent} />
      </Modal.Modal>
    </>
  );
}
