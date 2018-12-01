import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import SolicitudA from './ayuda/SolicitudA.js';
import ListaAyuda from './ayuda/ListaAyuda.js';
import ListaOfertas from './ayuda/ListaOfertas.js';
import { withTracker } from 'meteor/react-meteor-data';
import OfertaA from './ayuda/OfertaA.js';
import DetalleAyuda from './ayuda/DetalleAyuda.js';
import DetalleOferta from './ayuda/DetalleOferta.js';
import {SolicitudAyuda} from '../api/solicitudayuda.js';
import {OfertaAyuda} from '../api/ofertasAyuda.js';
import PropTypes from "prop-types";

class TableroSolicitudes extends Component {
	constructor(props) {
    super(props);

	    this.state = {
				nuevaOfertaAyuda:false,
				nuevaSolicitudAyuda:false,
				id:this.props.id,
				nickname:this.props.nickname,
				correo:this.props.correo,
				idSolAyuda:"",
				idOfertaAyuda:"",
				solAyuda:"",
				ofertaAyuda:"",
				solicitudes:true,
				ofertas:false,
				calAyuda:"",
				calOferta:"",
				calificaciones:[],
				calificacionesO:[],
	    };

	    this.publicarOfertaAyuda = this.publicarOfertaAyuda.bind(this);
			this.publicarSolicitudAyuda = this.publicarSolicitudAyuda.bind(this);
			this.renderAyuda = this.renderAyuda.bind(this);
			this.atras= this.atras.bind(this);
			this.verDetalle = this.verDetalle.bind(this);
			this.verDetalleOferta = this.verDetalleOferta.bind(this);
			this.verSolicitudes = this.verSolicitudes.bind(this);
			this.verOfertas = this.verOfertas.bind(this);
	}
	atras(atras){
		this.setState({nuevaOfertaAyuda:false,nuevaSolicitudAyuda:false,idSolAyuda:"",solAyuda:"", ofertaAyuda:"", idOfertaAyuda:""});
	}
	verDetalle(id){
		this.setState({idSolAyuda:id});
		Meteor.call('calificacionesAyuda.getSol', id, (err, res)=>{
			if(err){
				console.log("error");
			}
			else {
				this.setState({calificaciones:res});
			console.log("Listado de calificaciones"+JSON.stringify(res));
			}
		});

		Meteor.call('calificacionesAyuda.get', id, this.state.nickname , (err, res)=>{
			if(err){
				console.log("error");
			}
			else {
			this.setState({calAyuda:res});
			}
		});
		Meteor.call("solicitudayuda.getAyudaID",id,(err,res)=>{if(res){
			this.setState({solAyuda:res,nuevaSolicitudAyuda:false, nuevaOfertaAyuda:false, ofertaAyuda:""});
			}else{
				alert("Error tal vez no tiene id esa solicitud y es vieja, refresque la página");
			}
		});

	}
	verDetalleOferta(id)
	{
		this.setState({idOfertaAyuda:id});
		Meteor.call('calificacionesoferta.getSol', id, (err, res)=>{
			if(err){
				console.log("error");
			}
			else {
				this.setState({calificacionesO:res});
			console.log("Listado de calificaciones"+JSON.stringify(res));
			}
		});

		Meteor.call('calificacionesoferta.get', id, this.state.nickname , (err, res)=>{
			if(err){
				console.log("error");
			}
			else {
			this.setState({calOferta:res});
			}
		});
		Meteor.call("ofertasAyuda.getOfertaID",id,(err,res)=>{if(res){
			this.setState({ofertaAyuda:res,nuevaSolicitudAyuda:false, nuevaOfertaAyuda:false, solAyuda:""},()=>{

				});
			}else{
				alert("Error");
			}
		});
	}
	publicarSolicitudAyuda()
	{
		this.setState({nuevaSolicitudAyuda:true});
	}
	publicarOfertaAyuda()
	{
		this.setState({nuevaOfertaAyuda:true});
	}
	verSolicitudes()
	{
		this.setState({solicitudes:true, ofertas:false});
	}
	verOfertas()
	{
		this.setState({ofertas:true, solicitudes:false});
	}

	renderLista()
	{
		if(this.state.solicitudes)
		{
			return(<div>
				<div>
					<button className="btnSelec" onClick={this.verSolicitudes}>Solicitudes de ayuda</button>
					<button className="btnOferta" onClick={this.verOfertas}>Ofertas de ayuda</button>
					<button className="btnNueva" onClick={this.publicarSolicitudAyuda}>Publicar</button>
				</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<ListaAyuda verDetalle={this.verDetalle}/>

			   </div>);
		}
		else if(this.state.ofertas)
		{
			return(<div>
				<div>
					<button className="btnOferta" onClick={this.verSolicitudes}>Solicitudes de ayuda</button>
					<button className="btnSelec" onClick={this.verOfertas}>Ofertas de ayuda</button>
					<button className="btnNueva" onClick={this.publicarOfertaAyuda}>Publicar</button>
				</div>
				<br/>
				<br/>
				<br/>
				<br/>
				<ListaOfertas verDetalleOferta={this.verDetalleOferta}/>
			   </div>);
		}

	}

	renderAyuda(){

		if(this.state.nuevaSolicitudAyuda)
		{
			return (
				<SolicitudA id={this.state.id} nickname={this.state.nickname} correo={this.state.correo} atras={this.atras}/>
			);
		}
		else if(this.state.nuevaOfertaAyuda)
		{
			return (
				<OfertaA nickname={this.state.nickname} correo={this.state.correo} atras={this.atras}/>
			);
		}
		else if(this.state.solAyuda){
			//ver detalle
			return(<DetalleAyuda solicitud={this.state.solAyuda} id={this.state.id} nickname={this.state.nickname} calificaciones={this.state.calificaciones} calificacion={this.state.calAyuda} atras={this.atras}/>);
		}
		else if(this.state.ofertaAyuda){
			//ver detalle
			return(<DetalleOferta solicitud={this.state.ofertaAyuda} calificaciones={this.state.calificacionesO} calificacion={this.state.calOferta} correo={this.state.correo} nickname={this.state.nickname} atras={this.atras}/>);
		}
		else {
			return(
				<div>

				{this.renderLista()}

				</div>
		);
		}
	}

	render() {

		return (
			<div>
			{this.renderAyuda()}
			</div>
		);
	}
}
TableroSolicitudes.propTypes = {
  solicitudesAyuda:PropTypes.array,
};
export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");
  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
  };
})(TableroSolicitudes);
