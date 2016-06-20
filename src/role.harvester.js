var roleBuilder = require('./role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if(creep.shouldExecute()) {
            if(!creep.hasDestination() || creep.getDestinationType !== 'harvester') {
                // Create new destination
                let newDestination = creep.findClosestHarvesterDestination();
                if(newDestination) {
                    creep.setDestination(newDestination, 'harvester')
                } else {
                    roleBuilder.run(creep);
                    return;
                }
            }

            if(creep.shouldMove(3)) {
                creep.moveToTarget();
            } else {
                creep.transfer(creep.getDesination(), RESOURCE_ENERGY);
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