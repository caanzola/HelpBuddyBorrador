import React, { Component } from 'react';
import AyudaItemLista from '../ayuda/AyudaItemLista.js';
import '../App.css';
export default class PaginationA extends Component {
  constructor() {
    super();
    this.state = {
      items:[],
      currentPage: 1,
      todosPerPage: 4,
      indexOfLastTodo:"",
      indexOfFirstTodo:"",
      currentTodos:[],
    };
    this.handleClick = this.handleClick.bind(this);
    this.verDetalle = this.verDetalle.bind(this);
  }

  handleClick(event) {
    const items = this.state.items;
    const todosPerPage = this.state.todosPerPage;
    const indexOfLastTodo = event.target.id * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);

    this.setState({
      currentPage: Number(event.target.id),
      indexOfLastTodo:indexOfLastTodo,
      indexOfFirstTodo:indexOfFirstTodo,
      currentTodos:currentTodos
    });
    this.renderT=this.renderT.bind(this);
  }
  componentWillMount(){
    if(this.props.items){
      const items = this.props.items;
      const { currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = items.slice(indexOfFirstTodo, indexOfLastTodo);
      const nickname = this.props.nickname;
      const perPage = this.props.perPage;
    this.setState({items:this.props.items, indexOfLastTodo:indexOfLastTodo, indexOfFirstTodo:indexOfFirstTodo, currentTodos:currentTodos});
    }
  }
  renderT(){
    const {  items, currentPage, todosPerPage, indexOfLastTodo, indexOfFirstTodo, currentTodos } = this.state;
    if(items){
      const nickname = this.props.nickname;
      const renderTodos = currentTodos.map((item, index) => {
        if(index<=currentTodos.length){
          let rand = Math.random();
            return (<div  className="listao" key={rand*index}><AyudaItemLista verDetalle={this.verDetalle} nickname={nickname} solicitud={currentTodos[index]} key={index+"1"+currentPage*rand}/></div>);
        }

      });
      return renderTodos
  }
  else {
    return null;
  }
}
  verDetalle(id){
this.props.verDetalle(id);
  }
  render() {

    const items = this.state.items

    if(items){
      const todosPerPage = this.state.todosPerPage;
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
            {this.renderT()}
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
