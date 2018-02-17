import React from 'react';

export class Map extends React.Component{
	render(){
		return(
			<div>
				<iframe  src="https://www.openstreetmap.org/export/embed.html?bbox=101.6003179550171%2C56.14229794341103%2C101.65696620941164%2C56.16407334613584&amp;layer=mapnik" style="border: 1px solid black">
				</iframe>
				<br/>
				<small>
				<a href="https://www.openstreetmap.org/#map=15/56.1532/101.6286&amp;layers=N">Посмотреть более крупную карту</a></small>
			</div>
		)
	}
}