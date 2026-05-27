function SimulationControls({ currentTarget, prevSimulationStep, nextSimulationStep }) {
  return (
          <>
            <button onClick={prevSimulationStep}>
              Previous Step
            </button>
            <button onClick={nextSimulationStep}>
              Next Step
            </button>
            <p>step {currentTarget.step}: {currentTarget.description}</p>
          </>
        )}

export default SimulationControls;