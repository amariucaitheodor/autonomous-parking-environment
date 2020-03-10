import Mustache from 'mustache';

function generateProblem(robotGridStaticLocation, parkingLotConfiguration) {

    let carsString = "";
    let tilesString = "";
    let tilesSetupString = "";
    let carsStatusesString = "";
    let robotLocationString = `(IsAt Robot R${robotGridStaticLocation.row}C${robotGridStaticLocation.column})\n`;
    let carsLocationsString = "";

    let carIndex = 0;
    parkingLotConfiguration.forEach((tileRow, rowIndex) => {
        tileRow.forEach((tile, colIndex) => {
            tilesString = tilesString.concat(`        R${rowIndex}C${colIndex} - ${tile.type}\n`);

            if (colIndex > 0)
                tilesSetupString = tilesSetupString.concat(`        (IsToTheLeftOf R${rowIndex}C${colIndex - 1} R${rowIndex}C${colIndex})\n`);
            if (rowIndex > 0)
                tilesSetupString = tilesSetupString.concat(`        (IsAbove R${rowIndex - 1}C${colIndex} R${rowIndex}C${colIndex})\n`);

            if (tile.car !== undefined) {
                carIndex++;
                carsString = carsString.concat(`        Car${carIndex} - car\n`);
                carsLocationsString = carsLocationsString.concat(`        (IsAt Car${carIndex} R${rowIndex}C${colIndex})\n`);
                if (tile.car.status !== null)
                    carsStatusesString = carsStatusesString.concat(`        (${tile.car.status} Car${carIndex})\n`);
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

    return Mustache.render(`
    ;; Authors: Theodor Amariucai & Bora M. Alper (in no particular order)
    \n
    (define (problem parking)    
    (:domain finitech)    
        
    (:objects        
        {{robot}}
               
        {{cars}}       
                
        {{tiles}}
    )
        
    (:init        
        {{scenario}}
                
        {{setup}}
    )
        
    (:goal (and        
        (not (exists (?c - car) (or            
            (AwaitingParking ?c)            
            (AwaitingDelivery ?c)        
        )))    
    ))\n)
    `, plugins);
}

export default generateProblem;