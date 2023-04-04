import {ColorParserInterface} from "./ColorParserInterface";

export class ColorParser implements ColorParserInterface{
    public isHex(string:string):boolean{
        return /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(string) && string.length===7;
    };
    public isRgb(string:string):boolean {
        return  /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(string);
    };
    public parseToHex(rgbString:string): string | null{

        const rgbValues = rgbString.match(/\d+/g);
        if(rgbValues === null ){
            return null;
        }
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);

        const hexR = r.toString(16).padStart(2, "0");
        const hexG = g.toString(16).padStart(2, "0");
        const hexB = b.toString(16).padStart(2, "0");

        return  "#" + hexR + hexG + hexB;
    }

    public parseToRgb(hexColor: string, option?:string): number[] | string |null {

        hexColor = hexColor.replace("#", "");

        if (!/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
            return null;
        }

        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);

        if(option === 'string'){
            return `rgb(${r},${g},${b})`;
        }
        if(option === 'valuesString'){
            return `${r}${g}${b}`;
        }
        return [r, g, b];
    }
    public calculateSaturation(r:number, g:number, b:number):number {
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const delta = max - min;
        const l = (max + min) / 2;
        let s = 0;
        if (delta !== 0) {
            s = delta / (1 - Math.abs(2 * l - 1));
        }
        return s * 100;
    }
}