import React, { Component } from 'react';
import OfertaItemLista from '../ayuda/OfertaItemLista.js';
import '../App.css';
export default class PaginationO extends Component {
  constructor() {
    super();
    this.state = {
      items:[],
      currentPage: 1,
      todosPerPage: 4
    };
    this.handleClick = this.handleClick.bind(this);
    this.verDetalleOferta = this.verDetalleOferta.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  componentWillMount(){
    if(this.props.items){
    this.setState({items:this.props.items});
    }
  }
  verDetalleOferta(id){
this.props.verDetalleOferta(id);
  }
  render() {

    const {  items, currentPage, todosPerPage } = this.state;
    if(items){
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
      const nickname = this.props.nickname;
      const renderTodos = currentTodos.map((item, index) => {
        let rand = Math.random();
        return (<div  className="listao" key={rand*index}><OfertaItemLista verDetalleOferta={this.verDetalleOferta} nickname={nickname} solicitud={item} key={index+"1"+currentPage*rand}/></div>);

      });
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(items.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      let selected = this.state.currentPage;
      const renderPageNumbers = pageNumbers.map(number => {
        if(number===selected){
          return (
            <li
            className="number-selected"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        }
        else{
          return (
            <li
            className="number"
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        }
      });
      return (
        <div>
            {renderTodos}
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
    else{
      const renderPageNumbers = null;
      const renderTodos =null;
      return (
        <div>
            {renderTodos}
            <br/>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
  }
}
