import { IconContext } from "react-icons";
import { ImNext2 } from "react-icons/im";
import { ImPrevious2 } from "react-icons/im";
import { ImPlay2 } from "react-icons/im";
import { ImStop2 } from "react-icons/im";

import './css/Control.css';

function Control() {
	const size = '40';
	return (
        <div>
			<IconContext.Provider value={{ className: 'react-icons' }}>
				<ImPrevious2 size={size} /> 
				<ImPlay2 size={size} />
				<ImNext2 size={size} />
			</IconContext.Provider>
		</div>
	);
}

export default Control;