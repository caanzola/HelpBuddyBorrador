import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import sha256 from 'crypto-js/sha256';
import PropTypes from "prop-types";
import {Usuarios} from '../../api/usuarios.js';
var CryptoJS = require("crypto-js");
let animals =["tigre","leon","cocodrilo","serpiente","aguila","lobo", "buho", "perro", "conejo", "rana", "zorro","gato", "delfin","tiburon","pollo"];
let numbers =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let action = ["saltarin","sonriente","comelon","jugueton","dormilon","incognito","sisipeto","boxeador","futbolero","azul","rojo","astuto","aleatorio","feliz","estudioso"];
class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      correo: "",
      clave:"",
      repetirClave:"",
      nickname:"",
      error:""
    };
    this.handleChangeName=this.handleChangeName.bind(this);
    this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
    this.handleChangeClave=this.handleChangeClave.bind(this);
    this.handleChangeRClave=this.handleChangeRClave.bind(this);
    this.listo=this.listo.bind(this);
    this.atras=this.atras.bind(this);
  }
handleChangeName(event){
  this.setState({nombre: event.target.value},()=>{
    console.log(this.state.nombre)
  });
}
handleChangeCorreo(event){
  this.setState({correo: event.target.value});
}
handleChangeClave(event){
  this.setState({clave: event.target.value});
}
handleChangeRClave(event){
  this.setState({repetirClave: event.target.value});
}
atras(){
    this.props.atras(true);
  }

listo(){
  let {
    nombre,
    correo,
    clave,
    repetirClave,
  }=this.state;
  let msg="";
  console.log(nombre,correo,clave,repetirClave);
  if(nombre===""){
    msg="Se requiere el nombre";
    this.setState({error:msg});
    }
  else if(correo===""){
    msg=("Se requiere el correo");
    this.setState({error:msg});
    }
  else if(clave===""){
    msg=("Se requiere clave");
    this.setState({error:msg});
    }
  else if(clave!=repetirClave){
    msg="la clave debe coincidir";
    this.setState({error:msg});
    }
  else if(!correo.includes(".com") || (!correo.includes("@") &&!corre.includes(".co"))){
    msg=("Ingrese un correo valido");
    this.setState({error:msg});
    }
  else {
    //trata de registar al usuario
    var randomAnimal = Math.floor(Math.random() * 15);
    var randomNumber = Math.floor(Math.random() * 15);
    var randomAction = Math.floor(Math.random() * 15);
    let nickname =animals[randomAnimal]+numbers[randomNumber]+action[randomAction];
    let sk=Meteor.settings.public.stripe.p_key;
    const ciphertext = CryptoJS.AES.encrypt(clave, sk).toString();
    let search=Meteor.call("usuarios.getCorreo",correo,(err,user)=>{
      if(!user){
        Meteor.call("usuarios.add",nombre,correo,nickname,ciphertext,(err,res)=>{if(res==="success"){
          this.loged(correo,nickname);
        }else{
          var randomAnimal = Math.floor(Math.random() * 15);
          var randomNumber = Math.floor(Math.random() * 15);
          var randomAction = Math.floor(Math.random() * 15);
          let nickname =animals[randomAnimal]+numbers[randomNumber]+action[randomAction];
          console.log("Ya existe nickname");
          Meteor.call("usuarios.add",nombre,correo,nickname,ciphertext,(err,res)=>{if(res==="success"){
            this.loged(correo,nickname);
          }else{
            var randomAnimal = Math.floor(Math.random() * 15);
            var randomNumber = Math.floor(Math.random() * 15);
            var randomAction = Math.floor(Math.random() * 15);
            let nickname =animals[randomAnimal]+numbers[randomNumber]+action[randomAction];
            console.log("Ya existe nickname");
          } });
        } });
      }
      console.log(user);
      console.log("Ya se registro un usuario con ese correo, porfavor vuelva a intentarlo");
      this.setState({correo:""});
    });
  }
}
loged(correo,nickname){
  this.props.loged(true,correo,nickname);
}
renderError(error){
  let err= error;
  if(err){
    return (<h2 className="errorMsg">{err}</h2>);
  }
  else{
    return null;
  }
}
  render() {
    const divStyle = {
    width: "40%",
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
  nombre,
  correo,
  clave,
  repetirClave,
  error
}=this.state;
    return (
      <div style={divStyle}>
{this.renderError(error)}
<div style={w}>
      <br/>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput" className="letra">Nombre y apellido: </label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre y Apellido" value={nombre} onChange={this.handleChangeName}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2" className="letra">Correo: </label>
            <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="correo@correo.com"value={correo} onChange={this.handleChangeCorreo}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput4" className="letra">Contraseña: </label>
            <input type="password" className="form-control" id="formGroupExampleInput4" placeholder="Contraseña" value={clave} onChange={this.handleChangeClave}/>
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput5" className="letra">Confirmar contraseña: </label>
            <input type="password" className="form-control" id="formGroupExampleInput5" placeholder="Confirmar contraseña" value={repetirClave} onChange={this.handleChangeRClave}/>
          </div>
        </form>
        <br/>
        <button type="button" className="btnLis" onClick={this.listo}>Registrarme</button>
        <button type="button" className="btnOut" onClick={this.atras}>Atrás</button>
      </div>
      <br/>
      <br/>
      </div>
    );
  }
}
Registro.propTypes = {
  usuario:PropTypes.object,
};

export default withTracker(() => {
  Meteor.subscribe("usuarios");

  return {
    usuarios:Usuarios.find({}).fetch(),
  };
})(Registro);
