RoomObject.prototype.hasEmptySlot = function (range = 1) {
    let room = this.room;
    let pos = this.pos;
    
    for (var x = pos.x - range; x <= pos.x + range; x++) {
        for (var y = pos.y - range; y <= pos.y + range; y++) {
            let result = room.lookAt(x, y);
            let isTaken = _.any(result, function (r) {
                return r.type === 'creep'
                    || (r.type === 'terrain' && r.terrain === 'wall');
            });
    
            if (!isTaken) {
                return true;
            }
        }
    }
    
    return false;
};