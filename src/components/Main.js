import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css';



export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };
  //Executado apos o componente ser montado.
  componentDidMount() {
    //Capitura os dados do localstorage.
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    //Checar se existe tarefas no localstorage.
    if (!tarefas) return;
    //Se existir setamos o state.
    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    //Capiturar tarefas
    const { tarefas } = this.state;
    //Validação
    if (tarefas == prevState.tarefas) return;
    //Salvar no localStorege
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

  }

  handleSubmit = (e) => {
    //Para previnir o envio do formulario.
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    //(trim) seria para eliminar os espaços no inicio e no fim.
    novaTarefa = novaTarefa.trim();
    //Validação condicional
    if (tarefas.indexOf(novaTarefa) != -1) return;
    //Para alterar o valor de novasTarefas
    //Copiando tarefas para ser manipulado.
    const novasTarefas = [...tarefas];

    //Verificação se esta criando ou editando tarefas.
    if (index == -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;
      //Setar a alteração.
      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
        novaTarefa: '',
      })

    }


  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    //Setar o stado do state.
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });

  }

  handleDelete = (e, index) => {
    //Para poder manipular o stado de tarefas
    const { tarefas } = this.state;
    //Copiando tarefas
    const novasTarefas = [...tarefas];
    //Para eliminar a tarefa usamos o metodo splice
    novasTarefas.splice(index, 1);
    //Para alterar tarefas
    this.setState({
      tarefas: [...novasTarefas],
    });

  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      < div className="main" >
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

      </div >
    );
  }
}
