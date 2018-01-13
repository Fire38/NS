import { NavLink } from 'react-router-dom';
import React from 'react';

import logo from '../../images/logo.png'

export class Header extends React.Component{
	render() {
		return (
			<div>
                <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
					<NavLink to="/" className="navbar-brand" ><img src={logo} alt='logo'/></NavLink>
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to="/add_device" className="nav-link" >Добавить устройство</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/map" className="nav-link" >Карта</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/bot" className="nav-link">Бот</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/profile" className="nav-link" >Настройки</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/logout" className="nav-link" >Выйти</NavLink>
                            </li>
                            <a href="/logout" > Выход </a>
                        </ul>
                    </div>
                </nav>
            </div>
		)
	}
}