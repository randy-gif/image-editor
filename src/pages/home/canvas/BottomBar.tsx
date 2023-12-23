import React from 'react';
import { FiZoomIn, FiZoomOut} from "react-icons/fi";
import { IoMdUndo, IoMdRedo } from "react-icons/io";

interface BottomBarProps {
  // Add any props if needed
}

const zoomLevel = () => {
    return '100%'
}

const BottomBar: React.FC<BottomBarProps> = () => {
  return (
    <div className="bottom-bar">
        <div className='zoom'>
            <FiZoomIn size={30}/>
            <div className='zoomLevel'>{zoomLevel()}</div>
            <FiZoomOut size={30}/>
        </div>
        <div className='history'>
            <a className='undo' href='your-history.html'>undo <IoMdUndo size={30} /></a>
            <a className='redo' href='your-history.html'><IoMdRedo size={30} /> redo</a>
        </div>
        <div className='save'>
            <button className='save-button'>save</button>
        </div>
    </div>
  );
};

export default BottomBar;
