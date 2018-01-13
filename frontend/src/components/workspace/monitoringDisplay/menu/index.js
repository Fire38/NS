import { NavLink } from 'react-router-dom';
import React from 'react';

export class Menu extends React.Component{
	render(){
		return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
                        <ul className="nav nav-pills flex-column">
							<li className="nav-item">
                                <NavLink to="/device/ups" className="nav-link ">LogNetUPS</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/device/logdog" className="nav-link "> LogNetDOG</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/device/switch" className="nav-link ">Коммутаторы</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
			)
		}
}