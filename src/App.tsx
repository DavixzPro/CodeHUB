import { useState } from "react";
import { useRef } from "react";
import Simulation from "./engine/Simulation.ts";

import Dashboard from "./components/Dashboard.tsx";
import TopBar from "./components/TopBar.tsx";
import RobotSettings from "./components/RobotSettings.tsx";
import CommandEditor from "./components/CommandEditor.tsx";
import ArenaCanvas from "./components/ArenaCanvas.tsx";
import ControlPanel from "./components/ControlPanel.tsx";

import Parser from "./engine/Parser.ts";

export default function App(){

    const [code,setCode] = useState(`ligarintake()

andarfrente(60,120)

giraresquerda(90)

andarfrente(40,50)

ligarshooter()

parar()`);

    function execute(){

        const parser = new Parser();

        const commands = parser.parse(code);
        simulationRef.current.loadCommands(commands);
        simulationRef.current.start();

    }

    const simulationRef = useRef(new Simulation());
    const [, forceUpdate] = useState(0);

    simulationRef.current.onUpdate = () => {

        forceUpdate(v => v + 1);

    };

    return(

        <div className="window">

            <TopBar/>

            <div className="content">

                <aside className="left-panel">

                    <CommandEditor

                        code={code}

                        setCode={setCode}

                    />

                </aside>

                <main className="center-panel">
                    <ArenaCanvas simulation={simulationRef.current} />  
                </main>

                <aside className="right-panel">

                <div className="card">
                    <RobotSettings robot={simulationRef.current.robot}/>
                </div>

                <div className="card">
                    <Dashboard simulation={simulationRef.current}/>
                </div>

                <div className="card">
                    <ControlPanel execute={execute}reset={() => simulationRef.current.reset()}/>
                </div>

            </aside>

            </div>

        </div>

    );

}