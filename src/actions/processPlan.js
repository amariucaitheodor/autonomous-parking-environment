export default function processCommands(steps, robotLocation) {
    let newPathPoint = { column: robotLocation.column, row: robotLocation.row };
    let path = [newPathPoint];
    steps.forEach(action => {
        if (action.name.includes("go-up")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row - 1 };
            path.push(newPathPoint)
        } else if (action.name.includes("go-down")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row + 1 };
            path.push(newPathPoint)
        } else if (action.name.includes("go-right")) {
            newPathPoint = { column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("go-left")) {
            newPathPoint = { column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("dropoff-car-rightwards") ||
            action.name.includes("park-car-rightwards") ||
            action.name.includes("transfer-car-rightwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("dropoff-car-leftwards") ||
            action.name.includes("park-car-leftwards") ||
            action.name.includes("transfer-car-leftwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("lift-car-rightwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("lift-car-leftwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        }
    })
    return path;
};