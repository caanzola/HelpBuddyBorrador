import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
import {CalificacionAyuda} from '../../api/calificacionAyuda.js';
import AyudaItemLista from './AyudaItemLista.js';
import PaginationA from '../pagination/PaginationA.js';
import PropTypes from "prop-types";

class ListaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      nickname: this.props.nickname,
      list:this.props.solicitudesAyuda,
      searchList:[],
      busqueda:"",
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeBusqueda = this.onChangeBusqueda.bind(this);
  }
  onChangeBusqueda(event){
    this.setState({busqueda:event.target.value});
  }
  onChangePage(pageOfItems) {
     this.setState({ pageOfItems: pageOfItems });
 }
  verDetalle(id){
this.props.verDetalle(id);
  }
  renderList(solicitudes){
    let list =solicitudes;
    let busqueda = this.state.busqueda;
    if(list.length>0){
      if(busqueda.length>0){
        let items = list.map((solicitud)=>{
          if(solicitud.nombreSolicitud.startsWith(busqueda)){
            let rand = Math.random();
            return(
          <div  className="listao" key={rand}>
          <AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/>
          </div>)
          }
        });
        return(
          <div>
            <h2 className="hIem">{"Resultado de la busqueda: "+ busqueda }</h2>
            <br/>
            <br/>
          {items}
          <br/>
          <br/>
          </div>
        );
      }
      else{
        return(
          <div>
          <br/>
          <br/>
          <PaginationA items={list} nickname={this.state.nickname} verDetalle={this.verDetalle} perPage={4}/>
          <br/>
          <br/>
          </div>
        );
      }
    }
    else {
      return null;
    }
  }
  render() {
    const w = {
      width: "100%",
      margin: "auto",
    };
    let busqueda= this.state.busqueda;
    let lista = this.state.searchList;
    if(lista.length>0){
      return (
        <div>
        <h1 className="hIem">Listado de Solicitudes de Ayuda</h1>
        <form>
        <label htmlFor="search" className="letra">Buscar por nombre: </label>
        <input type="text" className="form-control" placeholder="Nombre solicitud.." id="search" value={busqueda} onChange={this.onChangeBusqueda}/>
        </form>
        <div style={w}>
        {this.renderList(lista)}
        </div>
        </div>
      );
    }
    else{
    return (
      <div>
      <h1 className="hIem">Listado de Solicitudes de Ayuda</h1>
      <form>
      <label htmlFor="search" className="letra">Buscar por nombre: </label>
      <input type="text" className="form-control" placeholder="Nombre solicitud.." id="search" value={busqueda} onChange={this.onChangeBusqueda}/>
      </form>
      <div style={w}>
      {this.renderList(this.props.solicitudesAyuda)}
      </div>
      </div>
    );
  }
  }
}
ListaAyuda.propTypes = {
  solicitudesAyuda:PropTypes.array,
  calificacionesAyuda:PropTypes.array,
};

export default withTracker(() => {
  Meteor.subscribe("solicitudayuda");
  Meteor.subscribe("calificacionesAyuda");
  return {
    solicitudesAyuda:SolicitudAyuda.find({}).fetch(),
    calificacionesAyuda:CalificacionAyuda.find({}).fetch(),
  };
})(ListaAyuda);
