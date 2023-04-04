import React from "react";
import {StorageService} from "../../services/StorageService";
interface Props {
    rgb:string[],
    handleSetShadesOfGray:(newShadeOfGray: string[]) => void;

}
const ShadeToChooseComponent: React.FC<Props> = ({  rgb, handleSetShadesOfGray }) => {
    const chooseShadeColor = (color: string) => {

        const [r, g, b] = color.split(",").map((c) => parseInt(String(c.match(/\d+/)!)));
        const newShadesOfGray = [];


        for (let i = 0; i < 500; i++) {
            const newR = Math.round((r * i) / 499);
            const newG = Math.round((g * i) / 499);
            const newB = Math.round((b * i) / 499);
            newShadesOfGray.push(`rgb(${newR}, ${newG}, ${newB})`);
        }


        for (let i = 500; i < 1000; i++) {
            const newR = Math.round(((255 - r) * (i - 500)) / 499 + r);
            const newG = Math.round(((255 - g) * (i - 500)) / 499 + g);
            const newB = Math.round(((255 - b) * (i - 500)) / 499 + b);
            newShadesOfGray.push(`rgb(${newR}, ${newG}, ${newB})`);
        }

        handleSetShadesOfGray(newShadesOfGray);
    };

    return (
        <div className="color-zipper-container">
            <div className="color-zipper">
                {rgb.map((color: string, index: number) => (
                    <div
                        onClick={() => {
                            chooseShadeColor(color);
                        }}
                        key={index}
                        style={{ backgroundColor: String(color),  }}
                    ></div>
                ))}
            </div>
        </div>
    )
};
export default ShadeToChooseComponent;