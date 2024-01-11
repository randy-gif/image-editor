import React, { useEffect, useState, useContext } from "react";
import { IoImageSharp  } from "react-icons/io5";
import CanvasContext from "../../CanvasContext";
import Rectangle from '../../classes/RectangleClass';
import createBitmap from '../../utils/createBitmap';
import CanvasImg from '../../classes/ImageClass';



const Element = () => {
    const [active, setActive] = useState<boolean>(false);
    const {addDrawing} = useContext(CanvasContext);

    const toggleActive = () => setActive((prevActive)=>!prevActive);

    const handleClick = () => {
        const rect = new Rectangle(625, 200, 100, 60, 'white');
        rect.drawOnCanvas();
        createBitmap(rect.canvas)
        .then((imageBitmap) => {
            rect.imageBitmap = imageBitmap;
            addDrawing(rect);
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const img = new CanvasImg(625, 200, 100, 60, fileReader.result as string);
                img.createBitmap()
                .then(() => {
                    addDrawing(img);
                })
            };
            fileReader.readAsDataURL(file);
        }
    };
    
    
    return(
        <div>
            <div className="icon">
                <span id='drawing-button' className='sidebar-button' onClick={toggleActive}><IoImageSharp size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{'Image'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>Image
                            <input type='file' onChange={handleFileChange} accept="image/*" ></input>
                        </label>
                        <label>Shapes
                            <button onClick={handleClick}>Image</button>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Element