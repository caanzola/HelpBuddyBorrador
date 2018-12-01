import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from "prop-types";
import {OfertasAyuda} from '../../api/ofertasAyuda.js';

class OfertaA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname:this.props.nickname,
      correo: this.props.correo,
      nombreOferta:"",
      descripcion:"",
      tipo:"",
      remunerada:"",
      entidad:"",
      publicada:false
    };

    this.nombreOfertaChange=this.nombreOfertaChange.bind(this);
    this.descripcionChange = this.descripcionChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.entidadChange=this.entidadChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.atras=this.atras.bind(this);
    this.publicar=this.publicar.bind(this);
    this.renderForm=this.renderForm.bind(this);
  }

  publicar()
  {
    console.log("Correo que publica: ", this.state.correo);
    Meteor.call("ofertasA.add", this.state.nickname, this.state.correo, this.state.nombreOferta, this.state.descripcion, this.state.tipo,
      this.state.remunerada, this.state.entidad, (err, resultado)=>{
        if(resultado)
        {
          alert("Tu oferta ha sido publicada con éxito");
          this.setState({
            publicada:resultado
          });
        }
    });

    this.atras();
  }
  atras(){
    this.props.atras(true);
  }
  nombreOfertaChange(event){
    this.setState({nombreOferta:event.target.value});
  }
  descripcionChange(event){
    this.setState({descripcion:event.target.value});
  }
  tipoChange(event){
    this.setState({tipo:event.target.value});
  }
  entidadChange(event){
    this.setState({entidad:event.target.value});
  }
  renderForm()
  {
    if(!this.state.publicada)
    {
      const divStyle = {
    width: "80%",
    margin: "auto",
      borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "20px",
    borderColor: "#041527",
     boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      };
      const w = {
        width: "80%",
        margin: "auto",
      }
      let {
        nickname, email, nombreOferta, descripcion, tipo, fechaLimite, entidad,remunn
      }=this.state;

      return (
    <div style={divStyle}>
      <div style={w}>
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput" className="letra">Título: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Titulo de la oferta" value={nombreOferta} onChange={this.nombreOfertaChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2" className="letra">Descripción: </label>
            <textarea className="form-control" rows="2" id="formGroupExampleInput2" placeholder="Descripcion de la solicitud"value={descripcion} onChange={this.descripcionChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="formControlSelect" className="letra">Tipo: </label>
            <select className="form-control" id="formControlSelect" value={tipo} onChange={this.tipoChange}>
            <option value="Personal">Personal</option>
            <option value="Monitoria">Monitoria</option>
            <option value="Recomendacion">Recomendacion</option>
            <option value="Otro">otro</option>
          </select>
          </div>
          <div className="form-group">
          <label className="letra">

          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} /> Cobro remuneración

        </label>
        <br/>
        <br/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput6" className="letra">Entidad: </label>
            <input type="text" className="form-control" id="formGroupExampleInput6" placeholder="Enitidad u Organización" value={entidad} onChange={this.entidadChange}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.publicar}>Publicar</button>
        <button type="button" className="btnOut" onClick={this.atras}>Atras</button>
      </div>
      <br/>
      <br/>
      </div>

       );//
    }

  }
  handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({
    remunerada: value
  });
}
  render() {
    return(
      <div>
        <br/>
        <h1 className="hIem">Crear Oferta de Ayuda</h1>
        <br/>
        {this.renderForm()}
      </div>
    );

  }
}
OfertaA.propTypes = {
  ofertasAyuda:PropTypes.array,
};

export default withTracker(() => {

Meteor.subscribe("ofertasAyuda");

  return {
    ofertasAyuda:OfertasAyuda.find({}).fetch()
  };
})(OfertaA);
