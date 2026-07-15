interface Props{

    code:string;

    setCode:(value:string)=>void;

    openStrategies:()=>void;

    save:()=>void;

}

export default function CommandEditor( {

    code,

    setCode,

    openStrategies,
    
    save

}:Props){

    return(

        <>

            <h2 className="editor-title">Editor de Comandos</h2>

            <textarea

                value={code}

                spellCheck={false}

                onChange={(e)=>setCode(e.target.value)}

                style={{

                    width:"100%",

                    height:"90%",

                    marginTop:20,

                    background:"#151515",

                    color:"white",

                    resize:"none",

                    padding:10,

                    fontFamily:"Consolas",

                    fontSize:15

                }}

            />

            <div className="editor-actions">

                <button
                    className="secondary"
                    onClick={openStrategies}
                >
                    📂 Estratégias
                </button>

                <button
                    onClick={save}
                >
                    💾 Salvar
                </button>

            </div>

        </>

    );

}