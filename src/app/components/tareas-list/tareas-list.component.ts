import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TareaModel } from 'src/app/models/tarea.model';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent implements OnInit {

  @Input()
  tareas: TareaModel[];

  @Output()
  $removeTareaId: EventEmitter<number>;

  constructor(private tareasService: TareasService) {
    this.$removeTareaId = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public removeTareaId(id: number) {
    this.$removeTareaId.emit(id);
  }

}
