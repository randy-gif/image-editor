import TextBoxButton from './buttons/TextBoxButton';
import RandomMemeButton from './buttons/RandomMemeButton';

function CanvasToolbar() {
    return (
        <div className='tool-bar-containor'>
            <TextBoxButton />
            <RandomMemeButton/>
        </div>
    );
};

export default CanvasToolbar;