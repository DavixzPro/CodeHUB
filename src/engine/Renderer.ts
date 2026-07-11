import Robot from "./Robot.ts";
import Scale from "../utils/Scales.ts";

export default class Renderer {

    drawRobot(

        ctx: CanvasRenderingContext2D,

        robot: Robot,

        canvas: number

    ) {

        const x = Scale.cmToPixels(robot.x, canvas);

        const y = Scale.cmToPixels(robot.y, canvas);

        const w = Scale.cmToPixels(robot.width, canvas);

        const l = Scale.cmToPixels(robot.length, canvas);

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(robot.angle * Math.PI / 180);

        // Corpo do robô
        ctx.fillStyle = "#1976D2";

        ctx.fillRect(

            -l / 2,

            -w / 2,

            l,

            w

        );

        // ==========================
        // INTAKE (frente)
        // ==========================

        ctx.fillStyle = robot.intake
            ? "#00ff00"
            : "#444";

        ctx.fillRect(

            -l / 4,

            -w / 2 - 8,

            l / 2,

            8

        );

        // ==========================
        // SHOOTER (traseira)
        // ==========================

        ctx.beginPath();

        ctx.fillStyle = robot.shooter
            ? "#00ff00"
            : "#17009b";

        ctx.arc(

            0,

            l / 4,

            18,

            0,

            Math.PI * 2

        );

        ctx.fill();

        ctx.restore();

    }

}