import React from "react";
import {StorageService} from "../../services/StorageService";
interface Props {
    shadesOfGray:string[];
    handleChooseHexColor:(message:string) => void;
}
const ColorToChoosePaletteComponent: React.FC<Props> = ({  shadesOfGray, handleChooseHexColor }) => {
    return (
        <div className="color-choice-container">
            <div className="color-choice" id="colorsPalette">
                {shadesOfGray.map((color: string, index: number) => (
                    <div key={index}
                         style={{ backgroundColor: String(color)}}
                         onClick={() => {
                             handleChooseHexColor(String(color));
                         }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
export default ColorToChoosePaletteComponent;