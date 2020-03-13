// This tests that the robot uses available parking tiles as movement options
var robotTestLocation0 = { "column": 0, "row": 0 };
var testConfiguration0 = [
    [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "blockedTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
    [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
    [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
    [{ "type": "hubTile", "car": { "license": "5F7VUS", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
    [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "blockedTile" }, { "type": "parkingTile", "car": { "license": "NEN26J", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
    [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "blockedTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
    [{ "type": "blockedTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
];

// This tests that the robot uses available parking tiles as movement options
// var robotTestLocation1 = { "column": 0, "row": 0 };
// var testConfiguration1 = [
//     [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "blockedTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
//     [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
//     [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
//     [{ "type": "hubTile", "car": { "license": "5F7VUS", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
//     [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "blockedTile" }, { "type": "parkingTile", "car": { "license": "NEN26J", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
//     [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "blockedTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
//     [{ "type": "blockedTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
// ];

var tests = [
    { robotTestLocation: robotTestLocation0, testConfiguration: testConfiguration0 },
    // { robotTestLocation: robotTestLocation1, testConfiguration: testConfiguration1 },
    // { robotTestLocation: robotTestLocation2, testConfiguration: testConfiguration2 },
    // { robotTestLocation: robotTestLocation3, testConfiguration: testConfiguration3 },
    // { robotTestLocation: robotTestLocation4, testConfiguration: testConfiguration4 },
    // { robotTestLocation: robotTestLocation5, testConfiguration: testConfiguration5 },
    // { robotTestLocation: robotTestLocation6, testConfiguration: testConfiguration6 },
    // { robotTestLocation: robotTestLocation7, testConfiguration: testConfiguration7 },
    // { robotTestLocation: robotTestLocation8, testConfiguration: testConfiguration8 },
    // { robotTestLocation: robotTestLocation9, testConfiguration: testConfiguration9 }
]
var noOfTests = tests.length
export default tests;
export { noOfTests };