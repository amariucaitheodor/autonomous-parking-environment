var tests = [];

// This tests that the robot uses available parking tiles as valid movement options
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "5F7VUS", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": "NEN26J", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile" }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests that the robot performs well under stress, with few empty spots and many actions to be made
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "7SUYQD", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "MNJYOP", "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "XGJSEJ", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "QM4PLF", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "NUJHOB", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "QKNQ41", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "X92OE6", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "PUCXC6", "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "G78ZQT", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "IELQK0", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "G2IHWL", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": "RJUONO", "status": "AwaitingDelivery" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "6QE0PG", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": "GAVDCO", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests stacking vehicles behind others
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "ZIGI6M", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "445UKF", "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "P7924W", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "UIAWRB", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "QTL0W1", "status": "Idle" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "P972ZQ", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "89UJ1T", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": "U4G3Q9", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": "8ENJ19", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": "54GFWM", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests clearing vehicles stacked behind others
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "hubTile", "car": { "license": "YYOY0R", "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "ELFU0H", "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": "B8KHMJ", "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": "SHSJQV", "status": "AwaitingDelivery" } }, { "type": "parkingTile", "car": { "license": "FZMBYC", "status": "AwaitingDelivery" } }],
        [{ "type": "hubTile", "car": { "license": "K23UVG", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "DUYUDE", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "parkingTile", "car": { "license": "WBB1FW", "status": "Idle" } }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
})

// This tests transferring vehicles to make space for others
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "FZYOQ9", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "FM7OGU", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "NMQZES", "status": "Idle" } }, { "type": "parkingTile", "car": { "license": "S6E1FY", "status": "Idle" } }, { "type": "parkingTile" }, { "type": "parkingTile" }],
        [{ "type": "hubTile", "car": { "license": "888INM", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "hubTile", "car": { "license": "0DWCRA", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "OBND2J", "status": "Idle" } }, { "type": "parkingTile" }, { "type": "parkingTile", "car": { "license": "9PBHU8", "status": "Idle" } }, { "type": "parkingTile" }],
        [{ "type": "hubTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }, { "type": "inaccessibleTile" }],
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
})

// This tests a partial planning event where 3/4 cars are delivered
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "HJ9N7E", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "FU2PWD", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "ZUWTFA", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "LW8M7W", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "GVQEMV", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "F9EQ0T", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "VYXBMW", "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "9JS87D", "status": "AwaitingDelivery" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "YTHQ3D", "status": "AwaitingOwner" } }, { "type": "roadTile" }, { "type": "parkingTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

// This tests a more advanced partial planning event where 3/5 cars are parked, and a transfer is required
tests.push({
    robotTestLocation: { "column": 0, "row": 0 },
    testConfiguration: [
        [{ "type": "roadTile" }, { "type": "roadTile" }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "BNIZWM", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "7RBB2M", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "2JZ29I", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "FQ6DPV", "status": "AwaitingDelivery" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "JC01D4", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "MUO4XI", "status": "AwaitingDelivery" } }, { "type": "parkingTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "4UMSCH", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "D1T370", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "89DUS9", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "parkingTile", "car": { "license": "T8KZ4K", "status": "Idle" } }, { "type": "inaccessibleTile" }, { "type": "roadTile" }, { "type": "roadTile" }],
        [{ "type": "hubTile", "car": { "license": "3W6F47", "status": "AwaitingParking" } }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }, { "type": "roadTile" }]
    ]
});

var noOfTests = tests.length
export default tests;
export { noOfTests };