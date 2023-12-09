import memeImg from '../../assets/meme-data'
import { useContext } from 'react';
import MyContext from '../../MyContext';

function RandomMemeButton() {
    const {paintImg} = useContext(MyContext);

    function randomMeme() {
        const randomNum = Math.floor(Math.random() * (memeImg.data.memes.length)) 
        return(memeImg.data.memes[randomNum]);
    };    

    function handleClick() {
        const img = new Image();
        img.src = randomMeme().url;
        img.onload = function() {
            paintImg(img);
        };
    };

    return( 
        <button className='random-meme-button' onClick={handleClick} >Get a new meme</button>
    );
};

export default RandomMemeButton;