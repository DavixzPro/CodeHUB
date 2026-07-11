import BaseCommand from "./BaseCommand.ts";
import Robot from "../Robot.ts";

export default class RotateCommand extends BaseCommand {

    private remaining: number;

    private readonly speed = 180;

    constructor(angle: number) {

        super();

        this.remaining = angle;

    }

    start(_robot: Robot) {}

    update(robot: Robot, deltaTime: number) {

        if (this.finished) return;

        const signal = Math.sign(this.remaining);

        const rotation = this.speed * deltaTime;

        if (Math.abs(this.remaining) <= rotation) {

            robot.rotate(this.remaining);

            this.finished = true;

            return;

        }

        robot.rotate(signal * rotation);

        this.remaining -= signal * rotation;

    }

}