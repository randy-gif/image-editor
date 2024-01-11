import React from 'react';
import '../Canvas.css';
import { IoMove, IoCrop, IoCut, IoColorFilterOutline, IoImageSharp  } from "react-icons/io5";
import { TbAdjustmentsHorizontal, TbTools, TbSpiral} from "react-icons/tb";
import { BiAdjust, BiBandAid, BiPaint, BiText } from "react-icons/bi";
import Adjust from './buttons/Adjust';
import Drawing from './buttons/Drawing';
import Element from './buttons/Element';


function SideBar() {
    return (
        <div  className='sidebar-container'>
            <Adjust />
            <li className='sidebar-li'><IoCrop size={30} /></li>
            <li className='sidebar-li'><IoCut size={30} /></li>
            <li className='sidebar-li'><TbAdjustmentsHorizontal size={30}/></li>
            <li className='sidebar-li'><BiAdjust size={30}/></li>
            <li className='sidebar-li'><IoColorFilterOutline size={30}/></li>
            <li className='sidebar-li'><TbTools size={30}/></li>
            <li className='sidebar-li'><TbSpiral size={30} /></li>
            <li className='sidebar-li'><BiBandAid size={30} /></li>
            <Drawing/>
            <li className='sidebar-li'><BiText size={30}/></li>
            <Element/>
        </div>
    );
};

export default SideBar;