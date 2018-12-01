import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {OfertasAyuda} from '../../api/ofertasAyuda.js';
import PropTypes from "prop-types";
import PaginationO from '../pagination/PaginationO.js';
import OfertaItemLista from './OfertaItemLista.js';

class ListaOfertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList:[],
      busqueda:"",
    };
    this.onChangeBusqueda = this.onChangeBusqueda.bind(this);
    this.renderList=this.renderList.bind(this);
    this.verDetalleOferta = this.verDetalleOferta.bind(this);
  }
  onChangeBusqueda(event){
    this.setState({busqueda:event.target.value});
  }
  verDetalleOferta(id){
    this.props.verDetalleOferta(id);
  }
  renderList(solicitudes){
    let list =solicitudes;

    let busqueda = this.state.busqueda;
    if(list.length>0){
      if(busqueda.length>0){
        let items = list.map((solicitud)=>{
          if(solicitud.nombreOferta.startsWith(busqueda)){

            let rand = Math.random();
            return(
              <div  className="listao" key={rand}><OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={this.state.nickname} solicitud={solicitud} key={solicitud.id}/></div>)
          }
        });
        return(<div>{items}</div>);
      }
      else {
      return(
        <div>
        <PaginationO items={list} nickname={this.state.nickname} verDetalleOferta={this.verDetalleOferta} perPage={4}/>
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
    let busqueda = this.state.busqueda;
    return (
      <div>
      <h1 className="hIem">Listado de Ofertas de Ayuda</h1>
      <form>
      <label htmlFor="search" className="letra">Buscar por nombre: </label>
      <input type="text" className="form-control" placeholder="Nombre solicitud.." id="search" value={busqueda} onChange={this.onChangeBusqueda}/>
      </form>
      <div style={w}>
      {this.renderList(this.props.ofertasAyuda)}
      </div>
      </div>
    );
  }
}
ListaOfertas.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

  Meteor.subscribe("ofertasAyuda");
  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch(),
  };
})(ListaOfertas);
