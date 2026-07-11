import Robot from "../Robot.ts";

export default abstract class BaseCommand {

    protected finished = false;

    abstract start(robot: Robot): void;

    abstract update(
        robot: Robot,
        deltaTime: number
    ): void;

    isFinished(): boolean {

        return this.finished;

    }

}