export default function generateCommands(steps, robotLocation) {
    let newPathPoint = { pickupCar: false, dropCar: false, column: robotLocation.column, row: robotLocation.row };
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
        } else if (action.name.includes("park-car-rightwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("retrieve-car-rightwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("dropoff-car-leftwards") ||
            action.name.includes("park-car-leftwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("pickup-car-leftwards") ||
            action.name.includes("retrieve-car-leftwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (action.name.includes("go-left")) {
            newPathPoint = { column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        }
    })
    return path;
};