import { useRef, useEffect, useState } from "react";
import CanvasToolbar from "./toolbar/CanvasToolbar"
import CanvasContext from './CanvasContext';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();
    const [canvasPosition, setCanvasPosition] = useState();
    const[painting, setPainting] = useState([
        {name: 'backgroundColor', data: ['black']},
        {name: 'img', data: []},
        {name: 'circle', data: []},
        {name: 'rectangle', data: []},
        {name: 'triangle', data: []},
        {name: 'line', data: []},
        {name: 'text', data: []}
    ]);

    useEffect(() => {
        if (!canvasPosition) setCanvasPosition(canvasRef.current.getBoundingClientRect());
        function handleScroll() {
            setCanvasPosition(canvasRef.current.getBoundingClientRect());
        }
        window.addEventListener('scroll', handleScroll);
    });





    // this useEffect paints the painting state on the canvas //
    useEffect(()=> {

        for (let i = 0; i < painting.length; i++) {
            for (let j = 0; j < painting[i].data.length; j++) {
                switch(painting[i].name) {
                    case 'backgroundColor':
                        paintBackground(painting[i].data[j]);
                    break;
                    case 'img':
                        autoPaintImg(painting[i].data[j]);
                    break;
                    case 'circle':
                        paintCircle(painting[i].data[j]);
                    break;
                    case 'rectangle':
                        paintRectangle(painting[i].data[j]);
                    break;
                    case 'triangle':
                        paintTriangle(painting[i].data[j]);
                    break;
                    case 'line':
                        paintLine(painting[i].data[j]);
                    break;
                    case 'text':
                        paintText(painting[i].data[j]);
                    break;
                };
            };  
        };
    },[painting]);

    function paintRectangle(rectObj) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.strokeStyle = rectObj.color;
        ctx.strokeRect(rectObj.x, rectObj.y , rectObj.width, rectObj.height);
    };

    
    function autoPaintImg(imgObj) {
        if(imgObj.height > canvasHeight) {
            imgObj.width = ((imgObj.width * canvasHeight)/imgObj.height);
            imgObj.height = canvasHeight;
        }
        const x = ((canvasWidth - imgObj.width)/2);
        const y = ((canvasHeight - imgObj.height)/2);
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(imgObj, x, y, imgObj.width, imgObj.height);
    };

    function paintImg (imgObj) {
        const index = findIndex('img');
        if (painting[index].data.includes(imgObj)) {
            setPainting(prevPainting => {
                const newPainting = [];
                for (let i = 0; i < prevPainting.length; i++) {
                    if(prevPainting[index] === prevPainting[i]) {
                        const newData = [];
                        for (let j = 0; j < prevPainting[i].data.length; j++) {
                            if(prevPainting[i].data[j].id === imgObj.id){
                                newData.push(imgObj);
                            }else {
                                newData.push(prevPainting[i].data[j]);  
                            }
                        }
                        const newObj = {name: 'img', data: newData};
                        newPainting.push(newObj);
                    }
                    else {
                        newPainting.push(prevPainting[i]);
                    }
                }
                return(newPainting);
            })
        }
        else {
            setPainting(prevPainting=> {
                const newPainting = [];
                for (let i = 0; i < prevPainting.length; i++) {
                    if(prevPainting[index] === prevPainting[i]) {
                        const newObj = {name: 'img', data: [...prevPainting[i].data, imgObj]};
                        newPainting.push(newObj);
                    }
                    else {
                        newPainting.push(prevPainting[i]);
                    }
                }
                return(newPainting);           
            }); 
        }
    }

    function findIndex(str) {
        let index = 0;
        for (let i = 0; i < painting.length; i++) {
            painting[i].name === str? index = i : false;
        }
        return index;
    }

    function paintRect(rectObj) {
        const index = findIndex('rectangle');
        if (painting[index].data.includes(rectObj)) {
            setPainting(prevPainting => {
                const newPainting = [];
                for (let i = 0; i < prevPainting.length; i++) {
                    if(prevPainting[index] === prevPainting[i]) {
                        const newData = [];
                        for (let j = 0; j < prevPainting[i].data.length; j++) {
                            if(prevPainting[i].data[j].id === rectObj.id){
                                newData.push(rectObj);
                            }else {
                                newData.push(prevPainting[i].data[j]);  
                            }
                        }
                        const newObj = {name: 'rectangle', data: newData};
                        newPainting.push(newObj);
                    }
                    else {
                        newPainting.push(prevPainting[i]);
                    }
                }
                return(newPainting);
            })
        }
        else {
            setPainting(prevPainting=> {
                const newPainting = [];
                for (let i = 0; i < prevPainting.length; i++) {
                    if(prevPainting[index] === prevPainting[i]) {
                        const newObj = {name: 'rectangle', data: [...prevPainting[i].data, rectObj]};
                        newPainting.push(newObj);
                    }
                    else {
                        newPainting.push(prevPainting[i]);
                    }
                }
                return(newPainting);           
            }); 
        }
    }

    function paintBackground(color) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0 , canvasWidth, canvasHeight);
    }
    const contextValue = {
        paintImg: paintImg,
        paintRect: paintRect,
        canvasPosition: canvasPosition,
    };
    return (
        <CanvasContext.Provider value={contextValue}>
            <section>
                <CanvasToolbar/>
                <div className='canvas-containor'>
                    <canvas className='my-canvas' ref={canvasRef} height={canvasHeight} width={canvasWidth} />
                </div>
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;