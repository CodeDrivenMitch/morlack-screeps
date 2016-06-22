Creep.prototype.roleUpgrader = function () {
    if (this.memory.upgrading && this.carry.energy == 0) {
        this.memory.upgrading = false;
    }
    if (!this.memory.upgrading && this.carry.energy == this.carryCapacity) {
        this.memory.upgrading = true;
    }


    if (this.memory.upgrading) {
        if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.controller);
        }
    }
    else {
        var source = this.pos.findClosestByRange(FIND_SOURCES);
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    }
};