var roleBuilder = require('./role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if(creep.shouldExecute()) {
            if(creep.hasDestination() && _.isEqual(creep.getDestinationType().valueOf(), "harvester".valueOf())) {
                if(creep.shouldMove(1)) {
                    creep.moveToTarget();
                } else {
                    let destination = creep.getDestination();
                    if(destination.energy >= destination.energyCapacity -1 || creep.transfer(destination, RESOURCE_ENERGY) !== OK) {
                        console.log(creep.name + " resetting");
                        creep.resetDestination();
                    }
                }
            } else {
                // Create new destination
                let newDestination = creep.findClosestHarvesterDestination();
                if(newDestination) {
                    creep.setDestination(newDestination, 'harvester')
                } else {
                    roleBuilder.run(creep);
                }
            }
        }
        else {
            let source = creep.findClosestSource();
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = roleHarvester;