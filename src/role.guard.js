var roleGuard = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (target) {
            if (creep.attack(target) !== OK) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleGuard;