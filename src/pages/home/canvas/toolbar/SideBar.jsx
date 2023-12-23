import TextBoxButton from './buttons/TextBoxButton';
import RandomMemeButton from './buttons/RandomMemeButton';
import '../Canvas.css';
import { IoMove, IoCrop, IoCut, IoColorFilterOutline, IoImageSharp  } from "react-icons/io5";
import { TbAdjustmentsHorizontal, TbTools, TbSpiral} from "react-icons/tb";
import { BiAdjust, BiBandAid, BiPaint, BiText } from "react-icons/bi";


function SideBar() {
    return (
        <ul  className='sidebar-container'>
            <li className='sidebar-li'><IoMove size={30}/></li>
            <li className='sidebar-li'><IoCrop size={30} /></li>
            <li className='sidebar-li'><IoCut size={30} /></li>
            <li className='sidebar-li'><TbAdjustmentsHorizontal size={30}/></li>
            <li className='sidebar-li'><BiAdjust size={30}/></li>
            <li className='sidebar-li'><IoColorFilterOutline size={30}/></li>
            <li className='sidebar-li'><TbTools size={30}/></li>
            <li className='sidebar-li'><TbSpiral size={30} /></li>
            <li className='sidebar-li'><BiBandAid size={30} /></li>
            <li className='sidebar-li'><BiPaint size={30} /></li>
            <li className='sidebar-li'><BiText size={30}/></li>
            <li className='sidebar-li'><IoImageSharp size={30} /></li>
        </ul>
    );
};

export default SideBar;