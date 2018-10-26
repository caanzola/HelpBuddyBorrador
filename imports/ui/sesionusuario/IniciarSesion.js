import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import sha256 from 'crypto-js/sha256';
import PropTypes from "prop-types";
var CryptoJS = require("crypto-js");
import {Usuarios} from '../../api/usuarios.js';

class IniciarSesion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correo: "",
      clave:"",
      nickname:"",
    };
    this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
    this.handleChangeClave=this.handleChangeClave.bind(this);
    this.listo=this.listo.bind(this);
  }

handleChangeCorreo(event){
  this.setState({correo: event.target.value});
}
handleChangeClave(event){
  this.setState({clave: event.target.value});
}

back(){
  window.location.reload();
}

listo(){
  let {
    correo,
    clave,
  }=this.state;
  if(correo===""){
    alert("Se requiere el correo");
  }
  else if(clave===""){
    alert("Se requiere clave");
  }
  else {
    let sk=Meteor.settings.public.stripe.p_key;
    const ciphertext = CryptoJS.AES.encrypt(clave, sk).toString();
    var bytes  = CryptoJS.AES.decrypt(ciphertext, sk);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    const uLoged = Meteor.call("usuarios.getUser",correo, (err, use)=>{
      if(use){
      var bytes  = CryptoJS.AES.decrypt(use.claveHash, sk);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      if(originalText===clave){
        this.loged(correo,use.nickname);
      }
      else{
        alert("Credenciales Invalidas");
      }
      }
      else{
        alert("Credenciales Invalidas");
      }
    });

  }
}
loged(correo, nickname){
  this.props.loged(true,correo,nickname);
}

  render() {
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
  correo,
  clave,
}=this.state;
    return (
      <div style={divStyle}>
<div style={w}>
      <br/>
        <form>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Correo: </label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="correo@correo.com"value={correo} onChange={this.handleChangeCorreo}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput4">Clave: </label>
            <input type="password" className="form-control" id="formGroupExampleInput4" placeholder="Clave" value={clave} onChange={this.handleChangeClave}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.listo}>Entrar</button>
        <button type="button" className="btnLis" onClick={this.back}>Atras</button>
      </div>
      <br/>
      </div>
    );
  }
}
IniciarSesion.propTypes = {
  usuario:PropTypes.object,
};

export default withTracker(() => {
  Meteor.subscribe("usuarios");

  return {
    usuarios:Usuarios.find({}).fetch(),
  };
})(IniciarSesion);
