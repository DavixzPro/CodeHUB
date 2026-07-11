import BaseCommand from "./BaseCommand.ts";
import Robot from "../Robot.ts";

export default class StrafeCommand extends BaseCommand {

    private remaining: number;

    private readonly initialDistance: number;

    private readonly speed: number;

    constructor(
        power: number,
        distance: number
    ) {

        super();

        this.initialDistance = distance;
        this.remaining = distance;

        this.speed = (power / 100) * 120;

    }

    start(robot: Robot) {

        this.remaining = this.initialDistance;
        this.finished = false;

        robot.strafeSpeed = this.speed;

    }

    update(
        robot: Robot,
        deltaTime: number
    ) {

        if (this.finished) return;

        const movement = Math.abs(this.speed * deltaTime);

        this.remaining -= movement;

        if (this.remaining <= 0) {

            robot.strafeSpeed = 0;

            this.finished = true;

        }

    }

}