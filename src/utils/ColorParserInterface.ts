export interface ColorParserInterface{
    isHex(string:string):boolean
    isRgb(string:string):boolean
    parseToHex(rgbString:string): string | null
    parseToRgb(hexColor: string, option?:string): number[] | string |null
    calculateSaturation(r:number, g:number, b:number):number
}