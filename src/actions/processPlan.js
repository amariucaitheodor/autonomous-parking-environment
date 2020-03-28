export default function processCommands(steps, robotLocation) {
    let path = [{ col: robotLocation.col, row: robotLocation.row }];
    steps.forEach((action, previousActionIndex) => {
        let command = action.name === undefined ? action : action.name;

        if (command.includes("go-up")) {
            path.push({ col: path[previousActionIndex].col, row: path[previousActionIndex].row - 1 });
        } else if (command.includes("go-down")) {
            path.push({ col: path[previousActionIndex].col, row: path[previousActionIndex].row + 1 })
        } else if (command.includes("go-right")) {
            path.push({ col: path[previousActionIndex].col + 1, row: path[previousActionIndex].row })
        } else if (command.includes("go-left")) {
            path.push({ col: path[previousActionIndex].col - 1, row: path[previousActionIndex].row })
        } else if (command.includes("dropoff-car-rightwards") ||
            command.includes("park-car-rightwards") ||
            command.includes("transfer-car-rightwards")) {
            path.push({ dropCar: true, col: path[previousActionIndex].col + 1, row: path[previousActionIndex].row });
        } else if (command.includes("dropoff-car-leftwards") ||
            command.includes("park-car-leftwards") ||
            command.includes("transfer-car-leftwards")) {
            path.push({ dropCar: true, col: path[previousActionIndex].col - 1, row: path[previousActionIndex].row });
        } else if (command.includes("lift-car-rightwards")) {
            path.push({ pickupCar: true, col: path[previousActionIndex].col + 1, row: path[previousActionIndex].row });
        } else if (command.includes("lift-car-leftwards")) {
            path.push({ pickupCar: true, col: path[previousActionIndex].col - 1, row: path[previousActionIndex].row });
        }
    })
    return path;
};