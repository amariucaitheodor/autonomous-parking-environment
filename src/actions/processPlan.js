export default function processCommands(steps, robotLocation) {
    let newPathPoint = { column: robotLocation.column, row: robotLocation.row };
    let path = [newPathPoint];
    steps.forEach(action => {
        let command = action.name === undefined? action : action.name;
        
        if (command.includes("go-up")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row - 1 };
            path.push(newPathPoint)
        } else if (command.includes("go-down")) {
            newPathPoint = { column: newPathPoint.column, row: newPathPoint.row + 1 };
            path.push(newPathPoint)
        } else if (command.includes("go-right")) {
            newPathPoint = { column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (command.includes("go-left")) {
            newPathPoint = { column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (command.includes("dropoff-car-rightwards") ||
            command.includes("park-car-rightwards") ||
            command.includes("transfer-car-rightwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (command.includes("dropoff-car-leftwards") ||
            command.includes("park-car-leftwards") ||
            command.includes("transfer-car-leftwards")) {
            newPathPoint = { dropCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (command.includes("lift-car-rightwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column + 1, row: newPathPoint.row };
            path.push(newPathPoint)
        } else if (command.includes("lift-car-leftwards")) {
            newPathPoint = { pickupCar: true, column: newPathPoint.column - 1, row: newPathPoint.row };
            path.push(newPathPoint)
        }
    })
    return path;
};