export default class Arena {

    readonly FIELD_SIZE_CM = 365.76; // 12 pés

    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
    ) {

        // Fundo
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Borda
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

        this.drawTiles(ctx, canvasWidth);
        this.drawFieldMarks(ctx, canvasWidth, canvasHeight);

    }

    private drawTiles(
        ctx: CanvasRenderingContext2D,
        width: number
    ) {

        const tileSize = width / 6;

        ctx.lineWidth = 2;

        for (let row = 0; row < 6; row++) {

            for (let col = 0; col < 6; col++) {

                const x = col * tileSize;
                const y = row * tileSize;

                // alterna um cinza bem suave
                ctx.fillStyle =
                    (row + col) % 2 === 0
                        ? "#1a1a1a"
                        : "#0c0c0c";

                ctx.fillRect(
                    x,
                    y,
                    tileSize,
                    tileSize
                );

                ctx.strokeStyle = "#2f2f2f";

                ctx.strokeRect(
                    x,
                    y,
                    tileSize,
                    tileSize
                );

            }

        }

    }

    private drawFieldMarks(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {

        this.drawBottomLaunchZone(ctx, width, height);

        this.drawTopLaunchZone(ctx, width, height)

        this.drawHumanPlayerZones(ctx,width,height);

        this.drawParkingZones(ctx, width, height);

        this.drawArtifactMarks(ctx, width);

        this.drawArtifactRamps(ctx, width);

        this.drawDepots(ctx, width);

    
    }

    private drawTopLaunchZone(
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number
        ) {
        
            ctx.beginPath();
        
            ctx.moveTo(
                0,
                0
            );
        
            ctx.lineTo(
                width,
                0
            );
        
            ctx.lineTo(
                width / 2,
                height / 2
            );
        
            ctx.closePath();
        
            ctx.fillStyle = "#ffffff00";
        
            ctx.fill();
        
            ctx.lineWidth = 2;
        
            ctx.strokeStyle = "white";
        
            ctx.stroke();
        
    }

    private drawBottomLaunchZone(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        const tile = width / 6;

        ctx.beginPath();

        ctx.moveTo(
            width / 2,
            height - 1 * tile
        );

        ctx.lineTo(
            width / 2 - tile,
            height
        );

        ctx.lineTo(
            width / 2 + tile,
            height
        );

        ctx.closePath();

        ctx.fillStyle = "#ffffff00";

        ctx.fill();

        ctx.lineWidth = 2;

        ctx.strokeStyle = "white";

        ctx.stroke();
    }

    private drawHumanPlayerZones(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {

        const tile = width / 6;

        ctx.fillStyle = "#ffffff00";

        // Esquerda
        ctx.fillRect(
            0,
            height - tile,
            tile,
            tile
        );

        // Direita
        ctx.fillRect(
            width - tile,
            height - tile,
            tile,
            tile
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";

        ctx.strokeRect(
            0,
            height - tile,
            tile,
            tile
        );

        ctx.strokeRect(
            width - tile,
            height - tile,
            tile,
            tile
        );

    }

    private drawArtifactMarks(
        ctx: CanvasRenderingContext2D,
        width: number
    ){
    
        const tile = width / 6;
    
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
    
        const lineLength = tile * 0.28;
    
        // y das linhas horizontais entre tatames
        const y3 = tile * 2.5;
        const y4 = tile * 3.5;
        const y5 = tile * 4.45;
    
        // posição exatamente entre as colunas 1 e 2
        const leftX = tile;
    
        // posição exatamente entre as colunas 5 e 6
        const rightX = tile * 5;
    
        // ---------- ESQUERDA ----------
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, leftX - lineLength/2, y3, leftX + lineLength/2, y3);
    
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, leftX - lineLength/2, y4, leftX + lineLength/2, y4);
    
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, leftX - lineLength/2, y5, leftX + lineLength/2, y5);
    
    
        // ---------- DIREITA ----------
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, rightX - lineLength/2, y3, rightX + lineLength/2, y3);
    
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, rightX - lineLength/2, y4, rightX + lineLength/2, y4);
    
        ctx.strokeStyle = "#ffffff";
        this.drawLine(ctx, rightX - lineLength/2, y5, rightX + lineLength/2, y5);
    
    }

    private drawParkingZones(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {

        const tile = width / 6;

        const size = tile * 0.8;

        const y = height - tile * 1.4 - size / 2;


        ctx.lineWidth = 2;


        // Vermelha
        ctx.strokeStyle = "#d32f2f";

        ctx.strokeRect(
            tile * 1.6 - size / 2,
            y,
            size,
            size
        );


        // Azul
        ctx.strokeStyle = "#1976d2";

        ctx.strokeRect(
            tile * 4.4 - size / 2,
            y,
            size,
            size
        );

    }

    private drawLine(
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
    
        ctx.beginPath();
    
        ctx.moveTo(x1, y1);
    
        ctx.lineTo(x2, y2);
    
        ctx.stroke();
    
    }

    private drawDepots(
        ctx: CanvasRenderingContext2D,
        width: number
    ) {

        const tile = width / 6;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";

        // =========================
        // DEPOT ESQUERDO
        // =========================

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.lineTo(
            tile * 1.2,
            0
        );

        ctx.lineTo(
            tile * 0.30,
            tile * 0.95
        );

        ctx.lineTo(
            0,
            tile * 1.2
        );

        ctx.closePath();

        ctx.fillStyle = "rgb(255, 0, 0)";

        ctx.fill();
        
        ctx.strokeStyle = "white";

        ctx.stroke();


        // =========================
        // DEPOT DIREITO
        // =========================

        ctx.beginPath();

        ctx.moveTo(
            width,
            0
        );

        ctx.lineTo(
            width - tile * 1.2,
            0
        );

        ctx.lineTo(
            width - tile * 0.30,
            tile * 0.95
        );

        ctx.lineTo(
            width,
            tile * 1.2
        );

        ctx.closePath();

        ctx.fillStyle = "rgb(3, 0, 209)";

        ctx.fill();
        
        ctx.strokeStyle = "white";

        ctx.stroke();

    }

    private drawArtifactRamps(
        ctx: CanvasRenderingContext2D,
        width: number
    ) {

        const tile = width / 6;

        const rampWidth = tile * 0.25;

        const rampHeight = tile * 3.05;

        ctx.fillStyle = "#555555";

        // Esquerda
        ctx.fillRect(
            0,
            0,
            rampWidth,
            rampHeight
        );

        // Direita
        ctx.fillRect(
            width - rampWidth,
            0,
            rampWidth,
            rampHeight
        );

        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";

        ctx.strokeRect(
            0,
            0,
            rampWidth,
            rampHeight
        );

        ctx.strokeRect(
            width - rampWidth,
            0,
            rampWidth,
            rampHeight
        );

    }

}