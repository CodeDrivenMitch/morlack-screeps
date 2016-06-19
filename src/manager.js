class Manager {
    constructor(name) {
        this.name = name;
    }
    
    manage() {
        throw new Error("Manage function of " + this.name + " not implemented!")
    }
    
    shouldExecute() {
        return true;
    }
}

module.exports = Manager;