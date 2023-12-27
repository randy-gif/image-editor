import React, { useEffect } from "react";
import { IoMove } from "react-icons/io5";
import useActive from "../../hooks/useActive";
import {DrawingObject} from '../../drawingTypes';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../../../theme';

const styledDiv = styled.div<{theme: Theme}>`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    
`;



const Adjust = () => {
    const {active, toggleActive} = useActive();

    return(
        <div>
            <div className="icon">
                <span id='Adjutst-button' className='sidebar-button' onClick={toggleActive}><IoMove size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{'Text'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>Name
                            <input type='text'></input>
                        </label>
                        <label>Opacity
                            <input type="range"></input>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Adjust