let C = require('./constants');

let Configurations = {
    BODY_WORKER: {
        parts: [WORK, CARRY, MOVE],
        cost: 200
    },
    BODY_MOVER: {
        parts: [CARRY, CARRY, MOVE],
        cost: 150
    },
    BODY_GUARD: {
        parts: [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE],
        cost: 300
    },
    BODY_PART_PRIORITY: [TOUGH, WORK, CARRY, ATTACK, MOVE],
    ROLE_PRIORITY: [C.ROLE_SUPPLIER, C.ROLE_HARVESTER, C.ROLE_UPGRADER, C.ROLE_BUILDER, C.ROLE_GUARD, C.ROLE_REPAIR],
    BODY_CONFIGURATIONS: {}
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_BUILDER] = {
    type: Configurations.BODY_WORKER
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_GUARD] = {
    type: Configurations.BODY_GUARD
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_HARVESTER] = {
    type: Configurations.BODY_WORKER
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_SUPPLIER] = {
    type: Configurations.BODY_MOVER
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_REPAIR] = {
    type: Configurations.BODY_WORKER
};

Configurations.BODY_CONFIGURATIONS[C.ROLE_UPGRADER] = {
    type: Configurations.BODY_WORKER
};


module.exports = Configurations;