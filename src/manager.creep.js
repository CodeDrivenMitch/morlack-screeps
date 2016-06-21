import Manager from 'manager';

var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleRepair = require('./role.repair');
var roleGuard = require('./role.guard');

class CreepManager extends Manager {
    constructor() {
        super("CreepManager");
    }

    shouldExecute() {
        return true;
    }
    
    manage() {
        console.log("Current tick: " + Game.time);
        for(var name in Game.creeps) {
            //noinspection JSUnfilteredForInLoop
            var creep = Game.creeps[name];

            // Conditions to keep checking or not
            if( CreepManager.checkTimeToLive(creep) || CreepManager.checkTask(creep)) {
                continue;
            }

            switch(creep.memory.role) {
                case 'harvester':
                    roleHarvester.run(creep);
                    break;
                case 'upgrader':
                    roleUpgrader.run(creep);
                    break;
                case 'builder':
                    roleBuilder.run(creep);
                    break;
                case 'repair':
                    roleRepair.run(creep);
                    break;
                case 'guard':
                    roleGuard.run(creep);
                    break;
                default:
                    console.log("Creep " + creep.name + ' has no role assigned!');
            }
        }
    }

    /** @param creep Creep */
    static checkTimeToLive(creep) {
        if(!creep.memory.rejuvenating && creep.ticksToLive < 500) {
            creep.memory.rejuvenating = true;
            
            // Return to your previous place after rejuvenation
            creep.memory.task = {
                type: 'move',
                x: creep.pos.x,
                y: creep.pos.y
            }
        }

        if(creep.memory.rejuvenating && creep.ticksToLive > 1200) {
            creep.memory.rejuvenating = false;
        }

        if(creep.memory.rejuvenating) {
            if(Game.spawns.Spawn1.renewCreep(creep) !== OK) {
                creep.moveTo(Game.spawns.Spawn1);
            }
            
            return true;
        }

        return false;
    }
    
    static checkTask(creep) {
        if(creep.memory.task) {
            let task = creep.memory.task;
            switch(task.type) {
                case 'move':
                    if(creep.pos.x === task.x && creep.pos.y === task.y) {
                        delete creep.memory.task;
                    } else {
                        creep.moveTo(task.x, task.y);
                    }
                    break;
            }


            return true;
        } else {
            return false;
        }
    }
}


module.exports = CreepManager;