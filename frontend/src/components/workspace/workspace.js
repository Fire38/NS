import React from 'react';
import { NetworkElementsRow, NetworkElements } from './networkDevices';


export class DevicesController extends React.Component{
	constructor(props){
		super(props);
		this.state = {devices: [], deviceTypeFromUrl: '', requestType: '', intervalId: null, firstRequest: true}
	}
	
	//берем начальное значение type из url
	componentWillMount(){
		this.setState({ deviceTypeFromUrl: this.props.match.params.type})
		//console.log(this.props.match.params.type)
	}
	
	// при монтировании компонента сразу начинаем посылать запросы по заданному url
	componentDidMount(){
		let type = this.state.deviceTypeFromUrl
		//console.log("Полезли сразу сюда" + this.state.deviceTypeFromUrl)
		/* this не передается
        см https://javascript.ru/forum/misc/40966-ne-mogu-v-setinterval-vyzvat-metod-obekta.html
        TO DO: выяснить почему */
		this.loadDevices(type)
		let th = this
		this.intervalId = setInterval(function() {th.loadDevices(type)}, 10000)
	}
	
	componentWillReceiveProps(nextProps){
		// если состояние не равно параметру из url - значит сменили страницу, стоп setInterval, меняем состояние
		if (this.state.deviceTypeFromUrl != nextProps.match.params.type){
			clearInterval(this.intervalId)
			this.setState({ deviceTypeFromUrl: nextProps.match.params.type, devices: null })
		}
	}
	
	// setState не меняется мгновенно в componentWillReceiveProps, пожтому используем DidUpdate, см док-цию
	componentDidUpdate(prevProps, presState){
		// если deviceTypeFromUrl поменялся значит надо запустить новый setInterval
		if (prevProps.match.params.type != this.state.deviceTypeFromUrl){
			let type = this.state.deviceTypeFromUrl
			this.loadDevices(type)
			let th = this
			this.intervalId = setInterval(function() { th.loadDevices(type)}, 10000)
		}
	}
	
	componentWillUnmount(){
		clearInterval(this.intervalId)
		this.setState({firstRequest: true})
	}
	
	
	async loadDevices(deviceType){
		console.log('Запрос к серверу с типом ' + deviceType)
		let res = await fetch("/api/devices/" + deviceType + "/").then(response => response.json())
		this.setState({ devices: res})
		
	}
	
		
	render(){
		let devices = this.state.devices;
		
		let size = 5
		let deviceArray = []
		
		// проверяем т к devices сначала null, не успевает отработать loadDevices()
		if (devices){
		//делим полученный массив на массивы по 5 элементов
		for (let i=0; i<devices.length; i+=size){
			var ar = devices.slice(i, i+size)
			//console.log(ar)
			deviceArray.push(ar)
			}
		} else {}
		
		// переменная хранящая отображение
		var devicesForDisplay
		if (devices === null){
			setTimeout('', 5000)
			devicesForDisplay = <div> Пожалуйста подождите, идет загрузка </div>
		}else if (devices.length > 0){
			devicesForDisplay = <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                        {	
							deviceArray.map((row,rowIndex) =>(
								<NetworkElementsRow key = {rowIndex} index = {rowIndex} array = {row}/>
								))
						}
                    </tbody>
                </table>
            </div>
		} else {
			devicesForDisplay = <div> Элементы отсутствуют в базе данных </div>
		}

		return (
			devicesForDisplay
		)
	}
}