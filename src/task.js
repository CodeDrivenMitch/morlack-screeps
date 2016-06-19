class Task {
    constructor(type, creep, goal) {
        this.type = type;
        this.creep = creep.name;
        this.inProgress = false;
        this.finished = false;
        let result = PathFinder.search(creep.pos, {pos: goal.pos, range: 1});
        this.path = result.path;
    }


    /**
     * Starts the task
     */
    start() {
        this.inProgress = true;
    }

    /**
     * Completes the task
     */
    complete() {
        this.finished = true;
        this.inProgress = false;
    }

    /**
     * Assigns a creep to a task
     * @param creep Creep
     */
    assignCreep(creep) {
        this.creepsAssigned.push(creep);
    }
}

module.exports = Task;