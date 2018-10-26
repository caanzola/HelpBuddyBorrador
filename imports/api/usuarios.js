import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Usuarios = new Mongo.Collection('usuarios');
//
if(Meteor.isServer)
{
	Meteor.publish("usuarios", ()=>{
		return Usuarios.find({});
	});
}

Meteor.methods(
{
	"usuarios.add":function(nombre,correo,nickname,claveHash){
		const usuario = Usuarios.findOne({
    	$or:[{correo:correo}, {nickname:nickname}]
	  });
	  if(!usuario)
	  {
	      Usuarios.insert({nombre:nombre,correo:correo,nickname:nickname,claveHash:claveHash});
				return "success";
	  }
	  else
	  {
			return "err";
	  }
	},
	"usuarios.getUser":function(correo){
		let mail = correo.toString();
		const usuario = Usuarios.findOne({ correo: correo});
	  return usuario;
	},
	"usuarios.getNickName":function(nickname){
		const usuario = Usuarios.findOne({
    	nickname:nickname
	  });
		return usuario;
	},
	"usuarios.getCorreo":function(correo){
		const usuario = Usuarios.findOne({
    	correo:correo
	  });
		return usuario;
	}
});
