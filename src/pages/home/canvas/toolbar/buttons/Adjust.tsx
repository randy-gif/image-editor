import React, { useEffect } from "react";
import { IoMove } from "react-icons/io5";
import useActive from "../../hooks/useActive";
import {DrawingObject} from '../../drawingTypes';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../../../themes';

const styledDiv = styled.div`
    background-color: ${props => props.theme.backgroundColor};
`;



const Adjust = (props: DrawingObject) => {
    const {active, toggleActive} = useActive();
    const {name, type} = props
    useEffect(() => {
        console.log(active);
    });
    return(
        <div>
            <div className="icon">
                <span id='Adjutst-button' className='sidebar-button' onClick={toggleActive}><IoMove size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{type?? 'Text'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>Name
                            <input type='text' value={type?? 'Text'}></input>
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