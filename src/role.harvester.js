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
                        roleHarvester.run(creep);
                    }
                }
            } else {
                // Create new destination
                let newDestination = creep.findClosestHarvesterDestination();
                if(newDestination) {
                    creep.setDestination(newDestination, 'harvester');
                    roleHarvester.run(creep);
                } else {
                    roleBuilder.run(creep);
                }
            }
        }
        else {
            if(creep.hasDestination() && _.isEqual(creep.getDestinationType().valueOf(), "source".valueOf())) {
                let source = creep.getDestination();
                if (creep.shouldMove(1)) {
                    creep.moveToTarget()
                } else {
                    creep.harvest(source);
                }
            } else {
                creep.setDestination(creep.findClosestSource(), 'source');
                roleHarvester.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;