Creep.prototype.roleBuilder = function () {
    if (this.memory.building && this.carry.energy == 0) {
        this.memory.building = false;
    }
    if (!this.memory.building && this.carry.energy == this.carryCapacity) {
        this.memory.building = true;
    }

    if (this.memory.building) {
        var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (target) {
            if (this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            this.roleSupplier();
        }
    }
    else {
        let carryCapacity = this.carryCapacity;
        var container = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter(structure) {
                return ((structure.structureType == STRUCTURE_CONTAINER || structure.strucureType === STRUCTURE_STORAGE) && (_.sum(structure.store) >= carryCapacity));
            }
        });

        if (container) {
            if (container.transfer(this, RESOURCE_ENERGY) !== OK) {
                this.moveTo(container);
            }
        } else {
            var source = this.pos.findClosestByRange(FIND_SOURCES);
            if (this.harvest(source) !== OK) {
                this.moveTo(source);
            }
        }

    }
};