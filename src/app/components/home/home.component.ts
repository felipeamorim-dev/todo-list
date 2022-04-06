import { TarefasService } from './../../services/tarefas.service';
import { Tarefa } from './../../models/tarefa';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  /**Inicialização dos icones dos itens da lista */
  iconDelet: string = environment.ICON_DELET;
  iconEdit: string = environment.ICON_EDIT;
  /**Inicialização do lista de tarefas */
  tarefas: Tarefa[] = this.tarefaService.getTarefas();

  mark: number = 0;
  /**Inicialização do formulário */
  entrada = new FormGroup({
    tarefa: new FormControl('')
  })

  constructor(private tarefaService: TarefasService) { }

  ngOnInit(): void {
    console.log("inicio")
  }

  ngDoCheck(): void {
    if(this.tarefas.length){
      this.tarefaService.saveLocalStoraged();
    }
  }

  onSubmit(){
    const t: Tarefa = {nome: this.entrada.value.tarefa, checked: false, edited: false, date: Date.now()};
    if(t.nome != null && t.nome != '') {
      this.tarefaService.save(t);
      this.onClean();
    }
  }

  editForm(value: string, index: number){
    this.tarefaService.update(index, value);
  }

  ondelete(index: number){
    this.tarefaService.delete(index);
  }

  private onClean(){
    this.entrada.value.tarefa = null;
  }

  onUpdate(index: number){
    this.tarefas[index].edited = true;
  }
  onChecked(index: number){
    this.tarefas[index].checked = !this.tarefas[index].checked;
  }

}
