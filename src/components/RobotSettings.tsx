import { useState } from "react";
import Robot from "../engine/Robot.ts";

type Props = {
    robot: Robot;
};

export default function RobotSettings({ robot }: Props) {

    const [width, setWidth] = useState(robot.width);
    const [length, setLength] = useState(robot.length);

    const [startX, setStartX] = useState(robot.startX);
    const [startY, setStartY] = useState(robot.startY);
    const [startAngle, setStartAngle] = useState(robot.startAngle);

    function apply() {

        if (width > 45.72 || length > 45.72) {

            alert("O tamanho máximo permitido pela FTC é 45,72 cm.");

            return;

        }

        robot.width = width;
        robot.length = length;

        robot.startX = startX;
        robot.startY = startY;
        robot.startAngle = startAngle;

        console.log(robot.x);
        console.log(robot.y);
        console.log(robot.angle);

        robot.reset();

    }

    return (

        <div>

            <h3>Robô</h3>

            <p>Largura (cm)</p>

            <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
            />

            <p>Comprimento (cm)</p>

            <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
            />

            <br />
            
            <p>Posição Inicial X (cm)</p>

                <input
                    type="number"
                    value={startX}
                    onChange={(e) => setStartX(Number(e.target.value))}
                />

                <p>Posição Inicial Y (cm)</p>

                <input
                    type="number"
                    value={startY}
                    onChange={(e) => setStartY(Number(e.target.value))}
                />

                <p>Ângulo Inicial (°)</p>

                <input
                    type="number"
                    value={startAngle}
                    onChange={(e) => setStartAngle(Number(e.target.value))}
                />
            
            <br />

            <button onClick={apply}>
                Aplicar
            </button>

        </div>

    );

}