function NodeTable({ nodes, currentTarget, isSimulationVisible }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                    <th>Node ID</th>
                    <th>Node Name</th>
                    </tr>
                </thead>
                <tbody>
                    {nodes.map((node) => {
                    const isTarget = node.data.label === currentTarget.targetLabel;
                    return (
                        <tr key={node.id} style={{ backgroundColor: isTarget && isSimulationVisible ? "yellow" : "transparent" }}>
                        <td>{node.id}</td>
                        <td>{node.data.label}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default NodeTable;