interface Props{

    code:string;

    setCode:(value:string)=>void;

}

export default function CommandEditor({

    code,

    setCode

}:Props){

    return(

        <>

            <h2>Editor de Comandos</h2>

            <textarea

                value={code}

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

        </>

    );

}