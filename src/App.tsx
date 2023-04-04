import React, {useState, useEffect} from 'react';

import './App.scss';
import ColorPaletteComponent from "./components/ColorPaletteComponent";
import {StorageService} from "./services/StorageService";

function App() {
    const [color, setColor] = useState("ffffff");
    const storageService = new StorageService();


    useEffect(()=>{
        onInit();
    }, [])

    const onInit = () => {
    }


    return (
    <div className="App">
      <ColorPaletteComponent ></ColorPaletteComponent>

    </div>
  );
}

export default App;
