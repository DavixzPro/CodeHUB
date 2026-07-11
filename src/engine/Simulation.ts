import Robot from "./Robot.ts";
import Simulator from "./Simulador.ts";
import GameLoop from "./GameLoop.ts";
import BaseCommand from "./commands/BaseCommand.ts";

export default class Simulation {

    robot: Robot;

    public isRunning = false;

    simulator: Simulator;

    gameLoop: GameLoop;

    elapsedTime = 0;

    public onUpdate?: () => void;

    constructor() {

        this.robot = new Robot({

            name: "FTC Robot",

            width: 45,

            length: 45

        });

        this.simulator = new Simulator(this.robot);

        this.gameLoop = new GameLoop();

        this.simulator = new Simulator(this.robot);

        this.simulator.onFinish = () => {

            this.stop();

        };

    }

    loadCommands(commands: BaseCommand[]) {

        this.simulator.load(commands);

    }

    start() {

        this.isRunning = true;
        this.stop();

        this.elapsedTime = 0;

        this.gameLoop.start((dt) => {

            this.elapsedTime += dt;

            this.simulator.update(dt);

            this.robot.update(dt);

            this.onUpdate?.();

        });

    }

    reset() {

        this.isRunning = false;
        this.stop();

        this.elapsedTime = 0;

        this.robot.reset();

        this.onUpdate?.();

    }

    stop() {

        this.isRunning = false;
        this.gameLoop.stop();

    }

}