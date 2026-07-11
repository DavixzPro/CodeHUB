import Robot from "./Robot.ts";
import BaseCommand from "./commands/BaseCommand.ts";

export default class Simulator {

    public onFinish?: () => void;

    private robot: Robot;

    private commands: BaseCommand[] = [];

    private current = 0;

    constructor(robot: Robot) {

        this.robot = robot;

    }

    load(commands: BaseCommand[]) {

        this.commands = commands;

        this.current = 0;

        if (this.commands.length > 0) {

            this.commands[0].start(this.robot);

        }

    }

    update(deltaTime: number) {

        if (this.current >= this.commands.length)
            return;

        const command = this.commands[this.current];

        command.update(this.robot, deltaTime);

        if (command.isFinished()) {

            this.current++;

            if (this.current < this.commands.length) {
            
                this.commands[this.current].start(this.robot);
            
            } else {
            
                this.onFinish?.();
            
            }
        
        }

        

    }

}