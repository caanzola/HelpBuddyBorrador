import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import {SolicitudAyuda} from '../../api/solicitudayuda.js';
import {CalificacionAyuda} from '../../api/calificacionAyuda.js';
import AyudaItemLista from './AyudaItemLista.js';
import PropTypes from "prop-types";
class ListaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickname,
    };
    this.renderList=this.renderList.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
  }
  verDetalle(id){
    console.log(this.state.nickname+" LLEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    Meteor.call('calificacionesAyuda.get', id, this.state.nickname , (err, res)=>{
      if(err){
        console.log("error");
        this.props.verDetalle(id, null);
      }
      else {
      this.props.verDetalle(id, res);
      }
    });

  }
  renderList(solicitudes){
    let list =solicitudes;
    if(list.length>0){
      let render = list.map((item,i)=>{
         return(<div  className="listao"><AyudaItemLista verDetalle={this.verDetalle} nickname={this.state.nickname} solicitud={item} key={i+"1"}/></div>)
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
      <h1 className="hIem">Listado de Solicitudes de Ayuda</h1>
      <div style={w}>
      {this.renderList(this.props.solicitudesAyuda)}
      </div>
      </div>
    );
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
