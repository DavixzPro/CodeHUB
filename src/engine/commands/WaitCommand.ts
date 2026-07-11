import BaseCommand from "./BaseCommand.ts";
import Robot from "../Robot.ts";

export default class WaitCommand extends BaseCommand {

    private remaining: number;

    constructor(seconds: number) {

        super();

        this.remaining = seconds;

    }

    start(robot: Robot) {

        robot.speed = 0;
        robot.strafeSpeed = 0;
        robot.rotationalSpeed = 0;

    }

    update(
        _robot: Robot,
        deltaTime: number
    ) {

        if (this.finished) return;

        this.remaining -= deltaTime;

        if (this.remaining <= 0) {

            this.finished = true;

        }

    }

}