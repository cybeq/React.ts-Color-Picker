import React from "react";
import {StorageService} from "../../services/StorageService";
interface Props {
    handleSetColorHex: (hex:string) => void;
    handleSetMessage:(message:string) => void;
    color:string;
}

const SelectAndPreviewComponent: React.FC<Props> = ({ handleSetColorHex,  handleSetMessage, color}) => {
    const storageService = new StorageService();
    const saveToLocalStorage = (color:string) => {
        try{
            storageService.saveColorToLocalStorage(color);
            handleSetMessage(`Dodałeś kolor ${color} do swojej palety` )
        }catch(e){
            console.log(e)
            handleSetMessage('Dodałeś już taki sam kolor');
            if(e instanceof TypeError)
                handleSetMessage('Zły format stringa. Musisz podać wartość HEX')
        }
    }
    return (
        <div className="selected-color-tile-container">
            <label>
                <h1>#</h1>
                <div className="selected-color-input-container">
                    <input maxLength={6} type="text" value={color.replace("#",'')} onChange={e => handleSetColorHex(`#${e.target.value}`)} ></input>

                </div>
                <div className="selected-color-button-container">
                    <button onClick={()=> saveToLocalStorage(String(color))}>Zatwierdź kolor</button>
                </div>
            </label>
            <div className="selected-color-tile" >
                <div style={{  backgroundColor: `${color}` }}></div>
            </div>
        </div>
    );
}

export default SelectAndPreviewComponent;