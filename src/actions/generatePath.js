export default function generatePath(steps, robotLocation) {
    let newPathPoint = { i: robotLocation.x, j: robotLocation.y };
    let path = [newPathPoint];
    steps.forEach(action => {
        if (action.name.includes("go-up")) {
            newPathPoint = { i: newPathPoint.i - 1, j: newPathPoint.j };
            path.push(newPathPoint)
        } else if (action.name.includes("go-down")) {
            newPathPoint = { i: newPathPoint.i + 1, j: newPathPoint.j };
            path.push(newPathPoint)
        } else if (action.name.includes("go-right") ||
            action.name.includes("park-car-rightwards") ||
            action.name.includes("retrieve-car-rightwards")) {
            newPathPoint = { i: newPathPoint.i, j: newPathPoint.j + 1 };
            path.push(newPathPoint)
        } else if (action.name.includes("go-left") ||
            action.name.includes("dropoff-car-leftwards") ||
            action.name.includes("pickup-car-leftwards") ||
            action.name.includes("park-car-leftwards") ||
            action.name.includes("retrieve-car-leftwards")) {
            newPathPoint = { i: newPathPoint.i, j: newPathPoint.j - 1 };
            path.push(newPathPoint)
        }
    })
    return path;
};