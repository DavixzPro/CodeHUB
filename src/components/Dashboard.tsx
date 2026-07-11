import Simulation from "../engine/Simulation.ts";

interface Props{

    simulation:Simulation;

}

export default function Dashboard({

    simulation

}:Props){

    const robot = simulation.robot;

    return(

        <>

            <h2>Sistemas</h2>

            <hr/>

            <br/>

            <h3>⏱ Tempo</h3>

            <p>{simulation.elapsedTime.toFixed(2)} s</p>

            <br/>

            <h3>Posição</h3>

            <p>X: {robot.x.toFixed(1)} cm</p>

            <p>Y: {robot.y.toFixed(1)} cm</p>

            <br/>

            <h3>Ângulo</h3>

            <p>{robot.angle.toFixed(1)}°</p>

            <br/>

            <h3>Mecanismos</h3>

            <p>

                {robot.intake ? "🟢 Ligado" : "⚫ Desligado"}

                {" "}Intake

            </p>

            <p>

                {robot.shooter ? "🟢 Ligado" : "⚫ Desligado"}

                {" "}Shooter

            </p>

            <br/>

            <h3>🎮 Estado</h3>

            <p>

                {simulation.isRunning ? "🟢 Executando" : "⚫ Parado"}

            </p>

        </>

    );

}