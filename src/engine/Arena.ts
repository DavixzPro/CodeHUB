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

        this.drawHumanPlayerZones(ctx,width,height);

        this.drawParkingZones(ctx, width, height);

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

}