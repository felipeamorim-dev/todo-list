import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  tarefas: Tarefa[] = this.isLocalStoragedTarefas() ? this.getLocalStoraged(): [];

  constructor() { }

  save(tarefa: Tarefa){
    this.tarefas.push(tarefa);
  }

  update(index: number, tarefa: string){
    this.tarefas[index].nome = tarefa;
  }

  delete(index: number){
    this.tarefas.splice(index)
  }

  saveLocalStoraged(){
    localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
  }

  getLocalStoraged(): Array<Tarefa>{
    return JSON.parse(localStorage.getItem('tarefas') || '[]');
  }

  isLocalStoragedTarefas(): boolean{
    return localStorage.getItem('tarefas') ? true : false;
  }

  getTarefas(): Array<Tarefa> {
    return this.tarefas;
  }

  setTarefas(tarefas: Array<Tarefa>){
    this.tarefas = tarefas;
  }
}
