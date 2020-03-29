import Mustache from 'mustache';
import { tileType, tileCarStatus } from '../components/Configuration';
import problemTemplate from '../assets/planner/problemTemplate';

function calculateCarsInProblem(configuration, carriedCar) {
    let carsToBeDelivered = 0;
    let carsToBeParked = 0;

    if (carriedCar !== undefined && carriedCar !== null) {
        if (carriedCar.status === tileCarStatus.AWAITING_PARKING)
            carsToBeParked++;
        else if (carriedCar.status === tileCarStatus.AWAITING_DELIVERY)
            carsToBeDelivered++;
    }

    configuration.forEach(tileRow => {
        tileRow.forEach(tile => {
            if (tile.type === tileType.HUB &&
                (tile.car === undefined || tile.car.status !== tileCarStatus.AWAITING_OWNER))
                carsToBeDelivered++;

            if (tile.type === tileType.PARKING &&
                (tile.car === undefined || tile.car.status !== tileCarStatus.IDLE))
                carsToBeParked++;
        })
    });

    return { carsToBeDelivered: carsToBeDelivered, carsToBeParked: carsToBeParked };
}

function generateProblem(robotGridStaticLocation, configuration, carriedCar) {

    let carsInProblem = calculateCarsInProblem(configuration, carriedCar)

    let carsString = "";
    let tilesString = "";
    let tilesSetupString = "";
    let carsStatusesString = "";
    let robotLocationString = `    (IsAt Robot R${robotGridStaticLocation.row}C${robotGridStaticLocation.col})\n`;
    let carsLocationsString = "";
    let carIndex = 0;

    if (carriedCar !== null) {
        carIndex++;
        carsString = carsString + `        Car${carIndex} - car\n`;
        carsLocationsString = carsLocationsString + `        (IsCarrying Robot Car${carIndex})\n`;

        if (carriedCar.status === tileCarStatus.AWAITING_DELIVERY && carsInProblem.carsToBeDelivered > 0) {
            carsStatusesString = carsStatusesString + `        (${carriedCar.status} Car${carIndex})\n`;
            carsInProblem.carsToBeDelivered--;
        } else if (carriedCar.status === tileCarStatus.AWAITING_PARKING && carsInProblem.carsToBeParked > 0) {
            carsStatusesString = carsStatusesString + `        (${carriedCar.status} Car${carIndex})\n`;
            carsInProblem.carsToBeParked--;
        }
    }

    configuration.forEach((tileRow, rowIndex) => {
        tileRow.forEach((tile, colIndex) => {
            tilesString = tilesString + `        R${rowIndex}C${colIndex} - ${tile.type}\n`;

            if (colIndex > 0)
                tilesSetupString = tilesSetupString + `        (IsToTheLeftOf R${rowIndex}C${colIndex - 1} R${rowIndex}C${colIndex})\n`;
            if (rowIndex > 0)
                tilesSetupString = tilesSetupString + `        (IsAbove R${rowIndex - 1}C${colIndex} R${rowIndex}C${colIndex})\n`;

            if (tile.car !== undefined) {
                carIndex++;
                carsString = carsString + `        Car${carIndex} - car\n`;
                carsLocationsString = carsLocationsString + `        (IsAt Car${carIndex} R${rowIndex}C${colIndex})\n`;

                if (tile.car.status === tileCarStatus.AWAITING_DELIVERY && carsInProblem.carsToBeDelivered > 0) {
                    carsStatusesString = carsStatusesString + `        (${tile.car.status} Car${carIndex})\n`;
                    carsInProblem.carsToBeDelivered--;
                } else if (tile.car.status === tileCarStatus.AWAITING_PARKING && carsInProblem.carsToBeParked > 0) {
                    carsStatusesString = carsStatusesString + `        (${tile.car.status} Car${carIndex})\n`;
                    carsInProblem.carsToBeParked--;
                }
            }
        })
    });

    var plugins = {
        robot: "Robot - robot",
        cars: carsString,
        tiles: tilesString,
        scenario: robotLocationString + carsLocationsString + carsStatusesString,
        setup: tilesSetupString
    };

    return Mustache.render(problemTemplate, plugins);
}

export default generateProblem;