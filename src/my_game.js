let _ = require('lodash');

class MyGame {

    constructor() {
        this.game = Game;
    }

    runCreepDoesNotExistCheck() {
        for (var name in this.game.creeps) {
            //noinspection JSUnfilteredForInLoop
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

    runMemoryChecks() {
        this.runCreepDoesNotExistCheck();
    }

    executeTowers() {
        _.each(this.findAllMyTowers(), (tower) => {
            try {
                tower.execute();
            } catch(error) {
                console.log("Could not execute tower with id " + tower.id + " because of error " + error);
            }
        });
    }

    findAllMyTowers() {
        let towers = [];
        _.each(this.game.rooms, function (room) {
            _.each(room.findAllActionableTowers(), function (tower) {
                towers.push(tower);
            })
        });

        return towers;
    }

    executeCreeps() {
        console.log("Current tick: " + this.game.time);
        for (var name in this.game.creeps) {
            //noinspection JSUnfilteredForInLoop
            var creep = this.game.creeps[name];

            try {
                creep.execute();
            } catch (error) {
                console.log("Script of creep " + creep.name + " terminated due to error: " + error);
            }
        }
    }
}

export default new MyGame();