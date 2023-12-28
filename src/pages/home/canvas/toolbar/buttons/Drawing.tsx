import React, { useEffect, useState, useContext } from "react";
import { BiPaint } from "react-icons/bi";
import {DrawingObject} from '../../drawingTypes';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../../../theme';
import useDrawingObjArray from "../../hooks/useDrawing" 
import { createRectangle } from '../../createDrawingObjects'
import CanvasContext from "../../CanvasContext";

const styledDiv = styled.div<{theme: Theme}>`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    
`;



const Drawing = () => {
    const [active, setActive] = useState<boolean>(false);
    const {removeDrawing, addDrawing} = useContext(CanvasContext);
    const toggleActive = () => setActive((prevActive)=>!prevActive);
    const createRectBtn = () => {
        createRectangle( 250, 100, 'white')
        .then((rectangle)=> {
            rectangle.x = 625;
            rectangle.y = 200;
            addDrawing(rectangle);
        })
        .catch((err)=> {
            throw new Error(err);
        })
    }
    return(
        <div>
            <div className="icon">
                <span id='drawing-button' className='sidebar-button' onClick={toggleActive}><BiPaint size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{'Text'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>tool
                            <input type='text'></input>
                        </label>
                        <label>Shapes
                            <button onClick={createRectBtn}>rectangle</button>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Drawing