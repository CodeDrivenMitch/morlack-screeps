import Manager from 'manager'

class MemoryManager extends Manager{
    constructor() {
        super("TowerManager")
    }

    shouldExecute() {
        return true;
    }

    manage() {
        _.each(Game.rooms, function(room) {
            let tower = room.find(FIND_STRUCTURES, {
                filter(structure) {
                    return structure.structureType == STRUCTURE_TOWER;
                }
            })[0];

            if(tower && tower.energy > 0) {
                var targets = tower.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType && structure.hits < structure.hitsMax
                    }
                });

                var target = null;

                _.each(targets, (possibleTarget) => {
                   if(target === null || possibleTarget.hits < target.hits) {
                       target = possibleTarget;
                   }
                });

                if (target > 0) {
                    tower.repair(target);
                }
            }
        })
    }
}


module.exports = MemoryManager;