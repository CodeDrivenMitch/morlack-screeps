Creep.prototype.roleRepair = function () {
    if (this.memory.repairing && this.carry.energy == 0) {
        this.memory.repairing = false;
    }
    if (!this.memory.repairing && this.carry.energy == this.carryCapacity) {
        this.memory.repairing = true;
    }

    if (this.memory.repairing) {
        var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax
            }
        });

        if (target) {
            if (this.repair(target) !== OK) {
                this.moveTo(target);
            }
        } else {
            this.roleSupplier();
        }

    } else {
        var container = this.findClosestFilledContainer();
        if (container && container.transfer(this, RESOURCE_ENERGY) != OK) {
            this.moveTo(container);
        }
    }
};