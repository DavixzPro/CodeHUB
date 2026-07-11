import Robot from "../engine/Robot.ts";

export default interface SimulationState {

    robot: Robot;

    running: boolean;

    elapsedTime: number;

}