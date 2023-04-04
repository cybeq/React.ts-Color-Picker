import React, { useState, useEffect } from "react";
import { StorageService } from "../services/StorageService";
import { ColorParser } from "../utils/ColorParser";
import GalleryComponent from "./children/GalleryComponent";
import FilterComponent from "./children/FilterComponent";
import SelectAndPreviewComponent from "./children/SelectAndPreviewComponent";
import ColorToChoosePaletteComponent from "./children/ColorToChoosePaletteComponent";
import ShadeChooseComponent from "./children/ShadeChooseComponent";

interface Props {}

const ColorPaletteComponent: React.FC<Props> = ({}) => {
    const storageService = new StorageService();
    const colorParser = new ColorParser();

    const colors = storageService.getColorGroupFromLocalStorage() as string[];

    const [color, setColorHex] = useState(()=>{
        return '#fff222';
    })
    const[message, setMessage] = useState(()=>{
        return "";
    })

    const [shadesOfGray, setShadesOfGray] = useState(() => {
        const shades = [];
        for (let i = 0; i < 1000; i++) {
            const shadeValue = Math.round((i / 999) * 255);
            const shade = `rgb(${shadeValue}, ${shadeValue}, ${shadeValue})`;
            shades.push(shade);
        }
        return shades;
    });
    const rgb = [];

    for (let i = 0; i < 1000; i++) {
        const r = i < 250 ? 255 : i < 500 ? Math.round(((500 - i) / 250) * 255) : i < 750 ? 0 : Math.round(((i - 750) / 250) * 255);
        const g = i < 250 ? Math.round((i / 250) * 255) : i < 500 ? 255 : i < 750 ? Math.round(((750 - i) / 250) * 255) : 0;
        const b = i < 250 ? 0 : i < 750 ? Math.round(((i - 250) / 500) * 255) : 255;
        const shade = `rgb(${r}, ${g}, ${b})`;
        rgb.push(shade);
    }

    const handleSetShadesOfGray = (shades:string[]) => {
        setShadesOfGray(shades)
    }

    const handleChooseHexColor = (rgbString:string) =>{
        chooseHexColor(rgbString)
    }
    const chooseHexColor = (rgbString:string) => {
        const color = colorParser.parseToHex(rgbString);
        setColorHex(color ?? 'rgb(0,0,0)');
        console.log(colorParser.parseToHex(rgbString))
    }
    const handleSetColorHex = (hex:string) => {
        setColorHex(hex);
    }

    const handleSetMessage = (message:string) => {
        setMessage(message)
    }


    const handleDelete = (color:string) =>{
        deleteColor(color);
    }
    const deleteColor = (color:string) => {
        storageService.deleteColorFromLocalStorage(color);
        setMessage(`Usunałeś ${color} z palety`)
    }


    return (
        <div className="colors-palette-container">
            <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Example" />

            <ShadeChooseComponent rgb={rgb} handleSetShadesOfGray={handleSetShadesOfGray}></ShadeChooseComponent>
            <ColorToChoosePaletteComponent shadesOfGray={shadesOfGray} handleChooseHexColor={handleChooseHexColor}></ColorToChoosePaletteComponent>

            <div className="border-line"><div></div></div>

            <SelectAndPreviewComponent
                handleSetColorHex={handleSetColorHex}
                color={color}
                handleSetMessage={handleSetMessage}
            ></SelectAndPreviewComponent>

            <FilterComponent
                handleSetMessage={handleSetMessage}
            ></FilterComponent>

            {message ?
                <div className="message-container" >
                    <div >
                        {message}
                    </div>
                </div> : <div></div>
            }

            <GalleryComponent
                handleDelete={handleDelete}
                colors={colors} ></GalleryComponent>

        </div>
    );
}

export default ColorPaletteComponent;