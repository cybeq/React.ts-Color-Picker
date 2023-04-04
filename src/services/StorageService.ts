import {ColorParser} from "../utils/ColorParser";

export class StorageService extends ColorParser{
    private storage: string[] = [];

 public constructor()
 {
     super();
     let localStorageColorsGroup = localStorage.getItem('hexColorGroup');
     if(!localStorageColorsGroup) {
         localStorage.setItem('hexColorGroup', JSON.stringify([]));
     }
     try{
         this.storage  = Array.from(JSON.parse(String(localStorage.getItem('hexColorGroup')))) as string[];
     }catch(e){
         throw new TypeError('Invalid JSON at StorageService constructor')
     }

 }
 public saveColorToLocalStorage(color:string):void
 {
    if(!this.isHex(color))
    {
        throw new TypeError('Not a valid HEX string')
    }
    if(this.storage.includes(`${color.toUpperCase()}`))
    {
        throw new Error('There is the same HEX already')
    }
    this.storage.push(`${color.toUpperCase()}`)
    localStorage.setItem('hexColorGroup', JSON.stringify(this.storage))
 }

 public deleteColorFromLocalStorage(color:string):void{
     this.storage = this.storage.filter((storedColor:string)=>storedColor !== color);
     localStorage.setItem('hexColorGroup', JSON.stringify(this.storage))
 }

 public sortColors(index:number, value:number):HTMLDivElement[]{
     let storage = this.storage;

     if(index === 0){
         storage = storage.filter(color=> {
             const rgb = (this.parseToRgb(color) as number[]);
             return (rgb[0] >= value )
         })
     }
     if(index === 1){
         storage = storage.filter(color=> {
             const rgb = (this.parseToRgb(color) as number[]);
             return (rgb[1] >= value )
         })
     }
     if(index === 2){
         storage = storage.filter(color=> {
             const rgb = (this.parseToRgb(color) as number[]);
             return (rgb[2] >= value )
         })
     }
     if(index === 3){
         storage = storage.filter(color=> {
             const rgb = (this.parseToRgb(color) as number[]);
             const saturation = this.calculateSaturation(rgb[0], rgb[1], rgb[2])
             return saturation >= value
         })
     }

     const domArray = [] as HTMLDivElement[];

     storage.forEach(color => {
         const container = document.createElement('div') as HTMLDivElement;
         const dom = document.createElement('div') as HTMLDivElement;
         dom.style.backgroundColor = `${color}`;
         dom.style.height="90px"
         dom.className="deletable"
         dom.innerHTML=`     <div class="invisible">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00000099"
                                         class="bi bi-trash" viewBox="0 0 16 16">
                                        <path
                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </div>`
         container.innerHTML = `
                        <p style="font-size:0.6em; margin:0;">${color}</p>
                      
                        `
         container.onclick = () => {
             this.deleteColorFromLocalStorage(color);
             window.location.reload();
         }
         container.appendChild(dom)
         domArray.push(container);

     });
     return domArray;
 }

 private sortRedGreenBlue(): void{
     this.storage = this.storage.sort((hex1: string, hex2: string) => {

         const rgb1 = this.parseToRgb(hex1) as number[];
         const rgb2 = this.parseToRgb(hex2) as number[];

         const grayScale = (rgb: number[]) => {
             return rgb[0] === rgb[1] && rgb[1] === rgb[2];
         };
         const isBlackOrWhite = (rgb: number[]) => {
             return rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0 || rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255;
         };
         if (grayScale(rgb1) && !isBlackOrWhite(rgb1)) {
             return 1;
         }
         if (grayScale(rgb2) && !isBlackOrWhite(rgb2)) {
             return -1;
         }
         if (isBlackOrWhite(rgb1) && !isBlackOrWhite(rgb2)) {
             return 1;
         }
         if (isBlackOrWhite(rgb2) && !isBlackOrWhite(rgb1)) {
             return -1;
         }

         if (rgb1[0] !== rgb2[0]) {
             return rgb2[0] - rgb1[0];
         } else if (rgb1[1] !== rgb2[1]) {
             return rgb2[1] - rgb1[1];
         } else {
             return rgb2[2] - rgb1[2];
         }

     });
 }

 public getColorGroupFromLocalStorage(): String[]{
     this.sortRedGreenBlue();
     return this.storage;
 }

}