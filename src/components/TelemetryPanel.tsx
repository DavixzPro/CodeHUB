import Robot from "../engine/Robot.ts";

interface Props {

    robot: Robot;

}

export default function TelemetryPanel({ robot }: Props) {

    return (

        <>

            <h2>📡 Telemetria</h2>

            <p style={{marginTop:15}}>

                {robot.intake ? "🟢" : "⚫"} Intake

            </p>

            <p style={{marginTop:10}}>

                {robot.shooter ? "🟢" : "⚫"} Shooter

            </p>

        </>

    );

}