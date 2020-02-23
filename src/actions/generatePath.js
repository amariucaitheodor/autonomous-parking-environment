export default function generatePath(steps, robotLocation) {
    let newPathPoint = { column: robotLocation.column, row: robotLocation.row };
    let path = [newPathPoint];
    steps.forEach(action => {
        if (action.name.includes("go-up")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row - 1 };
            path.push(newPathPoint)
        } else if (action.name.includes("go-down")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row + 1 };
            path.push(newPathPoint)
        } else if (action.name.includes("go-right") ||
            action.name.includes("park-car-rightwards") ||
            action.name.includes("retrieve-car-rightwards")) {
            newPathPoint = { column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("go-left") ||
            action.name.includes("dropoff-car-leftwards") ||
            action.name.includes("pickup-car-leftwards") ||
            action.name.includes("park-car-leftwards") ||
            action.name.includes("retrieve-car-leftwards")) {
            newPathPoint = { column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        }
    })
    return path;
};