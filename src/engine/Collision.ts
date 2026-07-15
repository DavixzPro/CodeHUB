import Robot from "./Robot.ts";

export default class Collision {

    static readonly FIELD_SIZE = 365.76;

    static checkWalls(robot: Robot): boolean {

        const radius = Math.max(robot.width, robot.length) / 2;

        return (
            robot.x - radius < 0 ||
            robot.x + radius > this.FIELD_SIZE ||
            robot.y - radius < 0 ||
            robot.y + radius > this.FIELD_SIZE
        );

    }

    static checkRamps(robot: Robot): boolean {

        const radius = Math.max(robot.width, robot.length) / 2;

        const tile = this.FIELD_SIZE / 6;

        const rampWidth = tile * 0.25;
        const rampHeight = tile * 3;

        // Esquerda
        if (
            robot.x - radius < rampWidth &&
            robot.y - radius < rampHeight
        ) {
            return true;
        }

        // Direita
        if (
            robot.x + radius > this.FIELD_SIZE - rampWidth &&
            robot.y - radius < rampHeight
        ) {
            return true;
        }

        return false;

    }

    private static pointInTriangle(
        px: number,
        py: number,
        ax: number,
        ay: number,
        bx: number,
        by: number,
        cx: number,
        cy: number
    ): boolean {
    
        const d1 =
            (px - bx) * (ay - by) -
            (ax - bx) * (py - by);
    
        const d2 =
            (px - cx) * (by - cy) -
            (bx - cx) * (py - cy);
    
        const d3 =
            (px - ax) * (cy - ay) -
            (cx - ax) * (py - ay);
    
        const hasNeg =
            d1 < 0 || d2 < 0 || d3 < 0;
    
        const hasPos =
            d1 > 0 || d2 > 0 || d3 > 0;
    
        return !(hasNeg && hasPos);
    
    }

    static checkDepots(robot: Robot): boolean {

        const tile = this.FIELD_SIZE / 6;

        const radius = Math.max(robot.width, robot.length) / 2;

        const rad = robot.angle * Math.PI / 180;
            
        const points = [
        
            // Centro
            {
                x: robot.x,
                y: robot.y
            },
        
            // Frente
            {
                x: robot.x + Math.sin(rad) * radius,
                y: robot.y - Math.cos(rad) * radius
            },
        
            // Trás
            {
                x: robot.x - Math.sin(rad) * radius,
                y: robot.y + Math.cos(rad) * radius
            },
        
            // Esquerda
            {
                x: robot.x - Math.cos(rad) * radius,
                y: robot.y - Math.sin(rad) * radius
            },
        
            // Direita
            {
                x: robot.x + Math.cos(rad) * radius,
                y: robot.y + Math.sin(rad) * radius
            }
        
        ];

        // ---------- DEPOT ESQUERDO ----------

        const A = { x: 0, y: 0 };
        const B = { x: tile * 1.2, y: 0 };
        const C = { x: tile * 0.30, y: tile * 0.95 };
        const D = { x: 0, y: tile * 1.2 };

        for (const p of points) {
                
            if (
            
                this.pointInTriangle(
                    p.x, p.y,
                    A.x, A.y,
                    B.x, B.y,
                    C.x, C.y
                )
            
                ||
            
                this.pointInTriangle(
                    p.x, p.y,
                    A.x, A.y,
                    C.x, C.y,
                    D.x, D.y
                )
            
            ) {
            
                return true;
            
            }
        
        }

        // ---------- DEPOT DIREITO ----------

        const E = { x: this.FIELD_SIZE, y: 0 };
        const F = { x: this.FIELD_SIZE - tile * 1.2, y: 0 };
        const G = { x: this.FIELD_SIZE - tile * 0.30, y: tile * 0.95 };
        const H = { x: this.FIELD_SIZE, y: tile * 1.2 };

        for (const p of points) {

            if (
            
                this.pointInTriangle(
                    p.x, p.y,
                    E.x, E.y,
                    F.x, F.y,
                    G.x, G.y
                )
            
                ||
            
                this.pointInTriangle(
                    p.x, p.y,
                    E.x, E.y,
                    G.x, G.y,
                    H.x, H.y
                )
            
            ) {
            
                return true;
            
            }
        
        }

        return false;

    }

}
