import { useEffect, useRef} from "react";

import Arena from "../engine/Arena.ts";
import Renderer from "../engine/Renderer.ts";
import Simulation from "../engine/Simulation.ts";

type Props = {
    simulation: Simulation;
};

export default function ArenaCanvas({ simulation }: Props) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.width = 900;
        canvas.height = 900;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const safeCanvas = canvas;
        const safeCtx = ctx;

        const arena = new Arena();

        const renderer = new Renderer();

        function draw() {
            
            console.log(simulation.robot.x);

            safeCtx.clearRect(
                0,
                0,
                safeCanvas.width,
                safeCanvas.height
            );

            arena.draw(
                safeCtx,
                safeCanvas.width,
                safeCanvas.height
            );

            renderer.drawRobot(
                safeCtx,
                simulation.robot,
                safeCanvas.width

            );

            requestAnimationFrame(draw);

        }

        draw();

    }, []);

    return (

        <canvas

            ref={canvasRef}

            style={{

                width: 900,

                height: 900,

                background: "white"

            }}

        />

    );

}