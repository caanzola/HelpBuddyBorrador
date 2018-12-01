import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const CalificacionOferta = new Mongo.Collection('calificacionesoferta');

if(Meteor.isServer)
{
	Meteor.publish("calificacionesoferta", ()=>{
		return CalificacionOferta.find({});
	});
}

Meteor.methods(
{
	"calificacionesoferta.add":function(idOferta, nickname, puntos){
				return CalificacionOferta.insert({nickname:nickname, idOferta:idOferta, puntos:puntos});
	  },
		"calificacionesoferta.get":function(idOferta, nickname){
			const calificacion = CalificacionOferta.findOne({ idOferta:idOferta ,nickname:nickname});
		  return calificacion;
		},
	"calificacionesoferta.getAll":function(){
		const calificaciones = CalificacionOferta.find({}).fetch();
		return calificacion;
	},
	"calificacionesoferta.getSol":function(idOferta){
		const calificacion = CalificacionOferta.find({ idOferta:idOferta}).fetch();
		if(!calificacion)
		{

				return null;
		}
		else
		{
			return calificacion;
		}
	}
});
