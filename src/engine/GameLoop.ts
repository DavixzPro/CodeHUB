export default class GameLoop {

    private running = false;

    private lastTime = 0;

    start(update: (deltaTime: number) => void) {
        
        if (this.running) return;
        
        this.running = true;
        
        this.lastTime = performance.now();
        
        const loop = (time: number) => {
        
            if (!this.running) return;
        
            let deltaTime = (time - this.lastTime) / 1000;
        
            this.lastTime = time;
        
            // evita pulos gigantes caso a aba fique travada
            deltaTime = Math.min(deltaTime, 0.05);
        
            update(deltaTime);
        
            requestAnimationFrame(loop);
        
        };
    
        requestAnimationFrame(loop);
    
    }

    stop() {

        this.running = false;

    }

}