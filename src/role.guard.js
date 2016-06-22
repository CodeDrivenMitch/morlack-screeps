Creep.prototype.roleGuard = function () {
    var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target) {
        if (this.attack(target) !== OK) {
            this.moveTo(target);
        }
    }
};