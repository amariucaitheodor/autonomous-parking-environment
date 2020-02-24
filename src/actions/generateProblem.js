import Mustache from 'mustache';

function generateProblem(robot, cars, tiles, scenario, setup) {
    var plugins = {
        robot: "Robot - robot",
        cars: `
        Car1 - car\n       
        Car2 - car\n        
        Car3 - car\n        
        Car4 - car\n
        `,
        tiles: `
        R0C0 - blockedTile\n        
        R0C1 - parkingTile\n        
        R0C2 - roadTile\n        
        R0C3 - parkingTile\n        
        R1C0 - blockedTile\n        
        R1C1 - parkingTile\n        
        R1C2 - roadTile\n
        R1C3 - parkingTile\n
        R2C0 - hubTile\n
        R2C1 - roadTile\n
        R2C2 - roadTile\n 
        R2C3 - parkingTile\n
        R3C0 - hubTile\n 
        R3C1 - roadTile\n 
        R3C2 - roadTile\n        
        R3C3 - parkingTile\n        
        R4C0 - hubTile\n        
        R4C1 - roadTile\n        
        R4C2 - roadTile\n        
        R4C3 - parkingTile\n    
        `,
        scenario: `
        (IsAt Robot R4C1)\n        
        (IsAt Car1 R2C3)\n        
        (IsAt Car2 R3C3)\n        
        (IsAt Car3 R4C3)\n        
        (IsAt Car4 R4C0)\n        
        (AwaitingDelivery Car1)\n        
        (AwaitingParking Car4)\n  
        `,
        setup: `
        (IsToTheLeftOf R0C0 R0C1)\n        
        (IsToTheLeftOf R0C1 R0C2)\n        
        (IsToTheLeftOf R0C2 R0C3)\n        
        (IsToTheLeftOf R1C0 R1C1)\n        
        (IsToTheLeftOf R1C1 R1C2)\n        
        (IsToTheLeftOf R1C2 R1C3)\n        
        (IsToTheLeftOf R2C0 R2C1)\n        
        (IsToTheLeftOf R2C1 R2C2)\n        
        (IsToTheLeftOf R2C2 R2C3)\n        
        (IsToTheLeftOf R3C0 R3C1)\n        
        (IsToTheLeftOf R3C1 R3C2)\n        
        (IsToTheLeftOf R3C2 R3C3)\n        
        (IsToTheLeftOf R4C0 R4C1)\n        
        (IsToTheLeftOf R4C1 R4C2)\n        
        (IsToTheLeftOf R4C2 R4C3)\n
        \n        
        (IsAbove R0C0 R1C0)\n        
        (IsAbove R0C1 R1C1)\n        
        (IsAbove R0C2 R1C2)\n        
        (IsAbove R0C3 R1C3)\n        
        (IsAbove R1C0 R2C0)\n        
        (IsAbove R1C1 R2C1)\n        
        (IsAbove R1C2 R2C2)\n        
        (IsAbove R1C3 R2C3)\n        
        (IsAbove R2C0 R3C0)\n        
        (IsAbove R2C1 R3C1)\n        
        (IsAbove R2C2 R3C2)\n        
        (IsAbove R2C3 R3C3)\n        
        (IsAbove R3C0 R4C0)\n        
        (IsAbove R3C1 R4C1)\n        
        (IsAbove R3C2 R4C2)\n        
        (IsAbove R3C3 R4C3)\n    
        `
    };

    return Mustache.render(`
    ;; Authors: Theodor Amariucai & Bora M. Alper (in no particular order)
    \n\n
    (define (problem parking)\n    
    (:domain finitech)\n    
    \n    
    (:objects\n        
        {{robot}}
        \n       
        {{cars}}       
        \n        
        {{tiles}}
    )
    \n\n    
    (:init\n        
        {{scenario}}
        \n        
        {{setup}}
    )
    \n\n    
    (:goal (and\n        
        (not (exists (?c - car) (or\n            
            (AwaitingParking ?c)\n            
            (AwaitingDelivery ?c)\n        
        )))\n    
    ))\n)\n\n
    `, plugins);
}

export default generateProblem;