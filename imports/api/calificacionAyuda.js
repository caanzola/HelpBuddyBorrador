import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const CalificacionAyuda = new Mongo.Collection('calificacionesAyuda');
//
if(Meteor.isServer)
{
	Meteor.publish("calificacionesAyuda", ()=>{
		return CalificacionAyuda.find({});
	});
}

Meteor.methods(
{
	"calificacionesAyuda.add":function(idAyuda, nickname, puntos){
    console.log(idAyuda, nickname, puntos);
				return CalificacionAyuda.insert({nickname:nickname, idAyuda:idAyuda, puntos:puntos});
	  },
		"calificacionesAyuda.get":function(idAyuda, nickname){
      console.log(idAyuda, nickname);
			const calificacion = CalificacionAyuda.findOne({ idAyuda:idAyuda ,nickname:nickname});
		  return calificacion;
		},
	"calificacionesAyuda.getAll":function(){
		const calificaciones = CalificacionAyuda.find({}).fetch();
		console.log(ofertas);
		return calificacion;
	}
});
