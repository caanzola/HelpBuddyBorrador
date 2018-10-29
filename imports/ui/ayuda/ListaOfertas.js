import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {OfertasAyuda} from '../../api/ofertasAyuda.js';
import PropTypes from "prop-types";
import OfertaItemLista from './OfertaItemLista.js';

class ListaOfertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalleOferta = this.verDetalleOferta.bind(this);
  }
  verDetalleOferta(id){
    this.props.verDetalleOferta(id);
  }
  renderList(solicitudes){
    let list =solicitudes;
    if(list.length>0){
      let render = list.map((item,i)=>{
         return(<div  className="listao"><OfertaItemLista verDetalleOferta={this.verDetalleOferta} solicitud={item} key={i}/></div>);
      });
      return(
        <div>
        {render}
        </div>
      );
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
    return (
      <div>
      <h1 className="hIem">Listado de Ofertas de Ayuda</h1>
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
