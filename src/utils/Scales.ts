export default class Scale{

    static readonly FIELD_CM = 365.76;

    static cmToPixels(
        cm:number,
        canvas:number
    ){

        return (cm/this.FIELD_CM)*canvas;

    }

    static pixelsToCm(
        pixels:number,
        canvas:number
    ){

        return (pixels/canvas)*this.FIELD_CM;

    }

}