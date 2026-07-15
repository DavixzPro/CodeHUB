import { useState } from "react";
import { useRef } from "react";

import { updateStrategy } from "./services/Storage";
import Simulation from "./engine/Simulation.ts";
import Dashboard from "./components/Dashboard.tsx";
import TopBar from "./components/TopBar.tsx";
import StrategyModal from "./components/StrategyModal.tsx";
import RobotSettings from "./components/RobotSettings.tsx";
import CommandEditor from "./components/CommandEditor.tsx";
import ArenaCanvas from "./components/ArenaCanvas.tsx";
import ControlPanel from "./components/ControlPanel.tsx";

import Parser from "./engine/Parser.ts";

export default function App(){

    const [code, setCode] = useState(`// ====================================
// CodeHub - FTC 2D Autonomous Simulator
// ====================================
//
// Escreva sua estratégia aqui.
//
// Exemplos:
//
// andarfrente(60,120)
// giraresquerda(90)
// ligarintake()
// ligarshooter()
// esperar(1000)
// parar()
//
// ====================================

`);

    const [showStrategies, setShowStrategies] = useState(false);
    const [currentStrategy, setCurrentStrategy] = useState<string | null>(null);

    const [saveMode, setSaveMode] = useState(false);

    function execute(){

        const parser = new Parser();

        const commands = parser.parse(code);
        simulationRef.current.loadCommands(commands);
        simulationRef.current.start();

    }

function save() {

    if (currentStrategy) {

        updateStrategy(currentStrategy, code);

        alert("Estratégia salva!");

    } else {

        setSaveMode(true);

        setShowStrategies(true);

    }

}

    const simulationRef = useRef(new Simulation());
    const [, forceUpdate] = useState(0);

    simulationRef.current.onUpdate = () => {

        forceUpdate(v => v + 1);

    };

    return(

        <div className="window">

            <TopBar />

            <div className="content">

                <aside className="left-panel">

                    <CommandEditor

                        code={code}

                        setCode={setCode}

                        openStrategies={() => setShowStrategies(true)}

                        save={save}

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
                    <ControlPanel
                        execute={execute}
                        reset={() => simulationRef.current.reset()}
                    />
                </div>

            </aside>

            </div>

            <StrategyModal
                open={showStrategies}
                saveMode={saveMode}
                onClose={() => {
                
                    setShowStrategies(false);
                
                    setSaveMode(false);
                
                }}
                currentCode={code}
                onLoad={(name, savedCode) => {
                        
                setCurrentStrategy(name);
                setCode(savedCode);
                        
            }}
            />

        </div>

    );

}