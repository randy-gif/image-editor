import React, { useEffect, useState } from "react";
import { BiPaint } from "react-icons/bi";
import {DrawingObject} from '../../drawingTypes';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../../../theme';

const styledDiv = styled.div<{theme: Theme}>`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    
`;



const Drawing = (props: DrawingObject) => {
    const [active, setActive] = useState<boolean>(false);
    const {name, type} = props
    const toggleActive = () => setActive((prevActive)=>!prevActive);
    return(
        <div>
            <div className="icon">
                <span id='drawing-button' className='sidebar-button' onClick={toggleActive}><BiPaint size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{type?? 'Text'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>tool
                            <input type='text' value={type?? 'Text'}></input>
                        </label>
                        <label>Shapes
                            <button>rectangle</button>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Drawing