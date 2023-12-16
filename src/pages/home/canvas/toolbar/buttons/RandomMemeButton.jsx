import { useContext } from 'react';
import memeImg from '../data/meme-data';
import CanvasContext from '../../CanvasContext';

function RandomMemeButton() {
    const {addDrawing} = useContext(CanvasContext);

    function randomMeme() {
        const randomNum = Math.floor(Math.random() * (memeImg.data.memes.length)) 
        return(memeImg.data.memes[randomNum]);
    };    

    function handleClick() {
        const img = new Image();
        img.src = randomMeme().url;
        img.onload = function() {
            addDrawing('img', {id: 1, img: img});
        };
    };

    return( 
        <button className='random-meme-button' onClick={handleClick} >Get a new meme</button>
    );
};

export default RandomMemeButton;