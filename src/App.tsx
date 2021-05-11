import React from "react";
import "./App.css";
import { Error } from "./components/error/error";
import { ListAllAgentsPage } from "./Pages/ListAllAgentsPage";
import { CompareAgentsPage } from "./Pages/CompareAgentsPage";
import { BrowserRouter, Route } from "react-router-dom";
import { AgentsApi, Agent } from "./Api";
import { WaitingForApiResponse } from "./components/waitingForApiResponse/waitingForApiResponse";

function App() {
  const [apiResponded, setApiResponded] = React.useState(false);
  // List of agents, as obtained from the api
  const [agents, setAgents] = React.useState<readonly Agent[]>([]);
  const [apiError, setApiError] = React.useState<string | null>(null);
  // List of agents selected for comparison.
  // Selected agents are remembered in the state and passed to the comparison page. That allows us to minimize the calls to potentially failing API.
  const [agentsForCompare, setAgentsForCompare] = React.useState<Agent[]>([]);

  // This hook is called once, when the App is first rendered.
  // This way we minimize the number of "uncertain" interactions with the Api.
  React.useEffect(() => {
    GetAgents();
  }, []);

  function GetAgents() {
    var api = new AgentsApi();
    api
      .listAgents()
      .then((res) => {
        setAgents(res);
        setApiError(null);
        setApiResponded(true);
      })
      .catch((err) => {
        setAgents([]);
        setApiError(err.message);
        setApiResponded(true);
      });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/home"
          render={() =>
            apiResponded ? (
              apiError ? (
                <Error errorText={apiError} />
              ) : (
                <ListAllAgentsPage
                  agents={agents}
                  agentsForCompare={agentsForCompare}
                  onAgentAddToCompare={(agent) =>
                    setAgentsForCompare((state) => state.concat(agent))
                  }
                  onAgentRemoveFromCompare={(agent) =>
                    setAgentsForCompare((state) =>
                      state.filter((includedAgent) => includedAgent !== agent)
                    )
                  }
                />
              )
            ) : (
              <WaitingForApiResponse />
            )
          }
        />
        <Route
          path="/compare"
          render={() => (
            <CompareAgentsPage agentsForCompare={agentsForCompare} />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
