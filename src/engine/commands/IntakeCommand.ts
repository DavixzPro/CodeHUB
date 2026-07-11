import BaseCommand from "./BaseCommand.ts";
import Robot from "../Robot.ts";

export default class IntakeCommand extends BaseCommand {

    private enabled: boolean;

    constructor(enabled: boolean) {

        super();

        this.enabled = enabled;

    }

    start(robot: Robot) {

        robot.intake = this.enabled;

        this.finished = true;

    }

    update(
        _robot: Robot,
        _deltaTime: number
    ) {}

}