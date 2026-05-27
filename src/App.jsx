// assumption: no 2 components in the architecture have the same name

import { useState, useEffect } from "react";
import "./App.css";

import SimulationControls from "./components/simulationControls";
import NodeTable from "./components/nodeTable";
import ConnectionTable from "./components/connectionTable";

function App() {
  // states
  const [nodes, setNodes] = useState(
    JSON.parse(localStorage.getItem("nodes")) || []
  );
  const [edges, setEdges] = useState(
    JSON.parse(localStorage.getItem("edges")) || []
  );
  const [command, setCommand] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // hard coded for testing purposes. In real implementation this would be created by user input or imported from file
  const simulationTrace = [
    { step: 1, targetLabel: "internet", description: "Attacker starts from internet" },
    { step: 2, targetLabel: "web-server", description: "Attacker reaches web-server" },
    { step: 3, targetLabel: "database", description: "Attacker accesses database" }
  ];

  const currentTarget = simulationTrace[currentStep];
  const [isSimulationVisible, setIsSimulationVisible] = useState(false);

  // simulation step handlers
  const nextSimulationStep = () => {
    if (currentStep < simulationTrace.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  }

  const prevSimulationStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  }

  // save nodes and edges to localstorage on new edge / node creation
  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [edges]);

  // command submission handler
  function handleCommandSubmit(event) {
    event.preventDefault();
    // validation to prevent empty commands
    if (command.trim() === "") {
      alert("Please enter a command.");
      return;
    }
    parseCommand(command);
    setCommand("");
  }

  // command parsing and execution logic
  function parseCommand(command) {
    let generateID = () => crypto.randomUUID(); // generate unique id for objects
    let args = command.split(" ");  //split commands via spaces. Follows format: action arg1 arg2?
    const action = args[0].toLowerCase(); // action is always first word in command, case insensitive

    // switch cases for command actions
    switch (action) {
      case "add": {
        if (!args[1]) {
          alert("Error: Please provide a name. Example: add web-server");
          return;
        }
        if (nodes.find((node) => node.data.label === args[1])) {
          alert("Error: A node with that name already exists.");
          return;
        }

        const nodeName = args[1];
        setNodes((prevNodes) => [
          ...prevNodes,
          {
            id: generateID(),
            position: { x: 0, y: 0 },
            data: { label: nodeName },
          }
        ]);
        break;
      }
      case "connect": {
        if (!args[1] || !args[2]) {
          alert("Error: Please provide two node names. Example: connect web-server database");
          return;
        }
        // prevent the same 2 nodes from having more than 1 connection
        if (edges.some((edge) => (edge.source === args[1] && edge.target === args[2]) || (edge.source === args[2] && edge.target === args[1]))) {
          alert("Error: A connection between these nodes already exists.");
          return;
        }

        if (!nodes.find((node) => node.data.label === args[1]) || !nodes.find((node) => node.data.label === args[2])) {
          alert("Error: Both nodes must exist to create a connection.");
          return;
        }

        const source = args[1];
        const target = args[2];
        setEdges((prevEdges) => [...prevEdges, 
          { 
            id: generateID(), 
            source, 
            target 
          }
        ]);
        break;
      }
      case "remove": {
        if (!args[1]) {
          alert("Error: Please provide a name. Example: remove web-server");
          return;
        }

        const nodeName = args[1];
        setNodes((prevNodes) =>
          prevNodes.filter((node) => node.data.label !== nodeName),
        );
        setEdges((prevEdges) =>
          prevEdges.filter((edge) => edge.source !== nodeName && edge.target !== nodeName)
        );
        break;
      }
      case "disconnect": {
        if (!args[1] || !args[2]) {
          alert("Error: Please provide two node names. Example: decouple web-server database");
          return;
        }
        const source = args[1];
        const target = args[2];
        setEdges((prevEdges) => prevEdges.filter((edge) => !(edge.source === source && edge.target === target)));
        break;
      }
      default:
        alert("Unknown command. Please use add, connect, remove, or decouple.");
    }
  }

  return (
    <>
      <div>
        <h1>Architecture Update & Simulation Exploration</h1>
      </div>

      <form onSubmit={handleCommandSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="add, remove, connect, disconnect"
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <button onClick={() => setIsSimulationVisible(!isSimulationVisible)}>
          {isSimulationVisible ? "Stop Simulation" : "Start Simulation"}
        </button>
        {isSimulationVisible && (
          <SimulationControls 
            currentTarget={currentTarget} 
            prevSimulationStep={prevSimulationStep} 
            nextSimulationStep={nextSimulationStep} 
          /> 
        )}
      </div>

      <div className="table-container">
        <NodeTable nodes={nodes} currentTarget={currentTarget} isSimulationVisible={isSimulationVisible} />
        <ConnectionTable edges={edges} />
      </div>
    </>
  );
}

export default App;
