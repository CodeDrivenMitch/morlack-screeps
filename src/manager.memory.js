import Manager from 'manager'

/**
 * Manages the memory - makes sure we don't use too much of it
 * 
 * - Deletes unused creeps' memory
 */
class MemoryManager extends Manager{
    constructor() {
        super("MemoryManager")
    }

    shouldExecute() {
        return true;
    }
    
    manage() {
        for (var name in Memory.creeps) {
            //noinspection JSUnfilteredForInLoop
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}


module.exports = MemoryManager;