### How to run the application locally



### Examples of supported inputs and expected behavior

add [node-name]
remove [node-name]
connect [node1] [node2]
disconnect [node1] [node2]

### Key design decisions and assumptions

1. Opted to persist Node and Edge data via client-side localstorage rather than build a dedicated backend as priority was on a functional MVP given the deadline
2. prioritised modularity and readability by abstracting UI elements into seperate components.
3. Assumed that in production environments, nodes with identical names would cause confusion. Thus, implemented validation to ensure all nodes had unique names
4. Assumed that 2 nodes would not have more than 1 edge between them.

### What you would improve with more time

- implemented more flexible input handling. For instance allowing the deletion of nodes / edges by ID or batch adding / deletion of nodes.
- migrated localstorage to dedicated database like MySQL or MongoDB to support persistant data storage across browsers and devices
- implemented a more robust testing suite
- additional page for users to create their own simulation traces using existing nodes. Current implementation is hard coded as a proof of concept using the nodes name instead of UUID which would be what is actually used in real implementation
- replaced text based UI with visual diagramming interface