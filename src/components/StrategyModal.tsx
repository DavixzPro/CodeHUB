import { useEffect, useState } from "react";
import {
    loadStrategies,
    saveStrategy,
    deleteStrategy
} from "../services/Storage";

import type { Strategy } from "../services/Storage";

interface Props {

    open: boolean;

    onClose: () => void;

    saveMode: boolean;

    currentCode: string;

    onLoad: (name: string, code: string) => void;

}

export default function StrategyModal({

    open,
    saveMode,
    onClose,
    currentCode,
    onLoad

}: Props) {

    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [name, setName] = useState("");

    useEffect(() => {

        if (open) {

            setStrategies(loadStrategies());

        }

    }, [open]);

    if (!open) return null;

    function save() {

        if (!name.trim()) return;

        saveStrategy({

            name,
            code: currentCode

        });

        setStrategies(loadStrategies());

        setName("");

    }

    function remove(name: string) {

        deleteStrategy(name);

        setStrategies(loadStrategies());

    }

    return (

        <div className="modal-overlay">

            <div className="strategy-modal">

                <h2>Estratégias</h2>

                {!saveMode && (

                <div className="strategy-list">

                    {

                        strategies.map(strategy => (

                            <div
                                className="strategy-item"
                                key={strategy.name}
                            >

                                <span className="strategy-name">

                                    📄 {strategy.name}

                                </span>

                                <div>

                                    <button

                                        onClick={() => {

                                            onLoad(strategy.name, strategy.code);

                                            onClose();

                                        }}

                                    >

                                        Abrir

                                    </button>

                                    <button

                                        className="secondary"

                                        onClick={() => remove(strategy.name)}

                                    >

                                        Excluir

                                    </button>

                                </div>

                            </div>

                        ))

                    

                    }

                    

                </div>

                )}

                <input

                    placeholder="Nome da estratégia"

                    value={name}

                    onChange={(e) => setName(e.target.value)}

                />

                <button onClick={save}>

                    Salvar Atual

                </button>

                <button

                    className="secondary"

                    onClick={onClose}

                >

                    Fechar

                </button>

            </div>

        </div>

    );

}