import React from "react";
import {StorageService} from "../../services/StorageService";
interface Props {
    handleSetMessage:(message:string) => void;
}
const FilterComponent: React.FC<Props> = ({  handleSetMessage}) => {
    const storageService = new StorageService();
    const sortColors = (index:number, value:number) => {

        const newGallery = storageService.sortColors(index, value)  as HTMLDivElement[];

        const oldGallery = (document.getElementById('colorsGallery')) as HTMLDivElement;
        oldGallery.innerHTML = '';
        for(let div of newGallery){
            oldGallery.appendChild(div)
        }
        handleSetMessage('Posortowałeś paletę')
    }

    const activateFilter = (divElement:HTMLInputElement) => {
        const activableElements = document.getElementsByClassName('activable') as HTMLCollection;
        const activableElementsArray = Array.from(activableElements);
        activableElementsArray.forEach((element: Element) => {
            (element as HTMLElement).style.opacity="0.2"
        });
        (divElement as HTMLInputElement).style.opacity=String(1)
    }


    return (
        <div className="filters">
            <div>
                <label>Czerwony</label>
                <input className="activable" style={{opacity:0.2}}
                       onMouseUp={(e)=> activateFilter(e.target as HTMLInputElement) }
                       type="range" min="0" max="255" defaultValue={0} onChange={(e)=>sortColors(0,parseInt(e.target.value))}/>
            </div>
            <div >
                <label>Zielony</label>
                <input className="activable" style={{opacity:0.2}}
                       onMouseUp={(e)=> activateFilter(e.target as HTMLInputElement) }
                       type="range" min="0" max="255" defaultValue={0} onChange={(e)=>sortColors(1,parseInt(e.target.value))} />
            </div>
            <div >
                <label>Niebieski</label>
                <input className="activable" style={{opacity:0.2}}
                       onMouseUp={(e)=> activateFilter(e.target as HTMLInputElement) }
                       type="range" min="0" max="255" defaultValue={0} onChange={(e)=>sortColors(2,parseInt(e.target.value))} />
            </div>
            <div >
                <label>Saturacja</label>
                <input className="activable" style={{opacity:0.2}}
                       onMouseUp={(e)=> activateFilter(e.target as HTMLInputElement) }
                       type="range" min="0" max="255" defaultValue={0} onChange={(e)=>sortColors(3,parseInt(e.target.value))} />
            </div>
        </div>
)
}
export default FilterComponent;