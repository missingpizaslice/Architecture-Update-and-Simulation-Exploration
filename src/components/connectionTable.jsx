function ConnectionTable({ edges }) {
  return (
    <>
        <table>
          <thead>
            <tr>
              <th>Connections</th>
            </tr>
          </thead>
          <tbody>
            {edges.map((edge) => (
              <tr key={edge.id}>
                <td>
                  {edge.source} → {edge.target}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default ConnectionTable;