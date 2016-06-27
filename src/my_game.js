let _ = require('lodash');
let Configurations = require('./configurations');

class MyGame {

    constructor() {
        this.game = Game;
    }

    checkSettings() {
        if (!Memory.settings) {
            Memory.settings = {};
        }

        if (!Memory.settings.amountOfCreeps) {
            Memory.settings.amountOfCreeps = {
                'harvester': 1,
                'builder': 1,
                'upgrader': 1
            }
        }
    }

    executeTowers() {
        _.each(this.findAllMyTowers(), (tower) => {
            try {
                tower.execute();
            } catch (error) {
                console.log("Could not execute tower with id " + tower.id + " because of error " + error);
            }
        });
    }

    executeSpawnCheck() {
        let spawn = this.game.spawns.Spawn1;
        if (spawn.spawning) {
            return;
        }

        let creepAmount = _.countBy(this.game.creeps, function (creep) {
            return creep.memory.role;
        });

        _.find(Configurations.ROLE_PRIORITY, function (role) {
            let currentCreeps = creepAmount[role] || 0;
            let neededCreeps = Memory.settings.amountOfCreeps[role];
            if (currentCreeps < neededCreeps) {
                let partConfig = Configurations.BODY_CONFIGURATIONS[role].type;

                let parts = [];
                let usableEnergy = spawn.room.energyAvailable;
                let times = (usableEnergy - usableEnergy % partConfig.cost) / partConfig.cost;
                if (times === 0) {
                    return false;
                }

                _.times(times, () => {
                    _.each(partConfig.parts, (part) => {
                        parts.push(part);
                    });
                });

                parts = _.sortBy(parts, function(part) {
                    return 10 - Configurations.BODY_PART_PRIORITY.indexOf(part);
                });


                let name = spawn.createCreep(parts, undefined, {role: role});

                console.log("Spawning new creep " + name + " with role " + role);
                return true;
            } else {
                return false;
            }
        })
    }

    findAllMyTowers() {
        let towers = [];
        _.each(this.game.rooms, function (room) {
            _.each(room.findAllActionableTowers(), function (tower) {
                towers.push(tower);
            })
        });

        return towers;
    }

    executeCreeps() {
        console.log("Current tick: " + this.game.time);
        for (var name in this.game.creeps) {
            //noinspection JSUnfilteredForInLoop
            var creep = this.game.creeps[name];

            try {
                creep.execute();
            } catch (error) {
                console.log("Script of creep " + creep.name + " terminated due to error: " + error);
            }
        }
    }
}

export default MyGame;