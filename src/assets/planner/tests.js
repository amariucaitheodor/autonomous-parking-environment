import { randomLicensePlate } from '../../components/Configuration';
// regex "license": ".{7}" to replace with "license": randomLicensePlate()

var tests = [];

// This tests that the robot uses available parking tiles as valid movement options
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests that the robot performs well under stress, with few empty spots and many actions to be made
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests stacking vehicles behind others
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests clearing vehicles stacked behind others
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
})

// This tests transferring vehicles to make space for others
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "parkingTile" }, { "type": "parkingTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "parkingTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
})

// This tests a partial planning event where 3/4 cars are delivered
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests a more advanced partial planning event where 3/5 cars are parked, and a transfer is required
tests.push({
    robotTestLocation: { "col": 0, "row": 0 },
    carriedCar: null,
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "AwaitingDelivery" } }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": randomLicensePlate(), "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": randomLicensePlate(), "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

var noOfTests = tests.length
export default tests;
export { noOfTests };