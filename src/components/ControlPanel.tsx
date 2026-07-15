interface Props{

    execute: () => void;

    reset: () => void;

}

export default function ControlPanel({

    execute,

    reset

}: Props){

    return(

        <>

            <h2>Painel</h2>

            <button
                style={{width:"100%", marginTop:20}}
                onClick={execute}
            >
                ▶ Executar
            </button>

            <button
                style={{width:"100%", marginTop:10}}
                onClick={reset}
            >
                🔄 Reiniciar
            </button>

        </>

    );

}