let _ = require('lodash');

class MyGame {

    constructor() {
        this.game = Game;
    }

    checkSettings() {
        if(!Memory.settings) {
            Memory.settings = {};
        }

        if(!Memory.settings.amountOfCreeps) {
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
            } catch(error) {
                console.log("Could not execute tower with id " + tower.id + " because of error " + error);
            }
        });
    }

    executeSpawnCheck() {
        let spawn = this.game.spawns.Spawn1;
        if(spawn.spawning || spawn.room.energyAvailable < spawn.room.energyCapacityAvailable * 0.25) {
            return;
        }

        let creeps = _.countBy(this.game.creeps, function(creep) {
            return creep.memory.role;
        });
        
        _.find(Memory.settings.amountOfCreeps, function(amount, role) {
            if(!creeps[role] || creeps[role] < amount) {
                let parts = [];
                let usableEnergy = spawn.room.energyAvailable;
                let times = (usableEnergy - usableEnergy%200) / 200;
                if(times === 0) {
                    return false;
                }
                _.times(times, () => {parts.push(WORK)});
                _.times(times, () => {parts.push(CARRY)});
                _.times(times, () => {parts.push(MOVE)});

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