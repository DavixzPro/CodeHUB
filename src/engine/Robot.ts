import type { RobotConfig } from "../types/Robot.ts";
import Collision from "./Collision.ts";

export default class Robot{

    //CONFIGS
    public name:string;
    public width:number;
    public length:number;

    //POSITION
    public x:number;
    public y:number;
    public angle:number;

    public startX = 182.88;
    public startY = 182.88;
    public startAngle = 0;

    //MECANISMS
    public intake:boolean;
    public shooter:boolean;

    public trajectory:{x:number,y:number}[];

    //SPEEDS
    public speed = 0;
    public rotationalSpeed = 0;
    public strafeSpeed = 0;


    constructor(config:RobotConfig){

        this.name = config.name;

        this.width = config.width;

        this.length = config.length;

        this.x = this.startX;
        this.y = this.startY;
        this.angle = this.startAngle;

        this.intake = false;

        this.shooter = false;

        this.trajectory = [];

    }

    moveForward(distance: number) {

        const radians = this.angle * Math.PI / 180;

        this.x += Math.sin(radians) * distance;
        this.y -= Math.cos(radians) * distance;

        this.trajectory.push({
            x: this.x,
            y: this.y
        });

    }
    
    moveBackward(distance: number) {
    
        this.moveForward(-distance);
    
    }
    
    rotate(angle: number) {

        this.angle += angle;
        console.log("Ângulo:", this.angle);

    }

    moveSideways(distance: number) {

        const radians = this.angle * Math.PI / 180;

        this.x += Math.cos(radians) * distance;
        this.y += Math.sin(radians) * distance;

        this.trajectory.push({

            x: this.x,

            y: this.y

        });

    }

    reset() {

        this.x = this.startX;
        this.y = this.startY;
        this.angle = this.startAngle;

        this.speed = 0;
        this.rotationalSpeed = 0;

        this.trajectory = [];

        this.intake = false
        this.shooter = false

    }

    update(deltaTime: number){

        const oldX = this.x;
        const oldY = this.y;
        const oldAngle = this.angle;

        if(this.speed !== 0){

            this.moveForward(

                this.speed * deltaTime

            );

        }

        if(this.rotationalSpeed !== 0){

            this.rotate(

                this.rotationalSpeed * deltaTime

            );

        }

        if(this.strafeSpeed !== 0){

            this.moveSideways(
            
                this.strafeSpeed * deltaTime
            
            );
        
        }

        if (Collision.checkWalls(this) || Collision.checkRamps(this) || Collision.checkDepots(this)) {

            this.x = oldX;
            this.y = oldY;
            this.angle = oldAngle;

        }

    }  

}