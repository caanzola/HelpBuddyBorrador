import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";

export default class TableroSolicitudes extends Component {
	constructor(props) {
    super(props);

	    this.state = {
	    };
	    this.publicarOferta = this.publicarOferta.bind(this);
	}

	publicarOferta()
	{
		
	}

	render() {
		return (
			<div> 

				<button className="btnOferta" onClick={this.publicarOferta}>Publicar oferta de ayuda</button>

			</div>
		);
	}
}
