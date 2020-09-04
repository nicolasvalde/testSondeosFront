import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { TareaModel } from 'src/app/models/tarea.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas: TareaModel[];

  dataForm: FormGroup;

  connectivity = true;

  error: string;

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe(
      resp => {
        this.tareas = (resp as TareaModel[]);
        this.connectivity = true;
      },
      error => {
        this.error = JSON.stringify(error.message);
        this.connectivity = false;
      }
    );

    this.dataForm = new FormGroup({
      descripcion: new FormControl('', Validators.required)
    });
  }

  public saveTarea() {
    if (this.dataForm.valid) {
      this.tareasService.saveTarea(this.dataForm).subscribe(
        data => {
          Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Tarea agregada con éxito',
            showConfirmButton: false,
            timer: 2000
          });
          this.tareas.push((data as TareaModel));
          this.dataForm.reset();
        },
        error => console.log(error)
      );
    } else {
      this.showAlert(`No se puede ingresar una tarea vacía`);
    }
  }

  public removeTarea(id: number) {
    this.tareasService.removeTarea(id).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'error',
          title: 'Tarea eliminada con éxito',
          showConfirmButton: false,
          timer: 2000
        });
        this.tareas.splice(this.tareas.findIndex(tarea => tarea.id === (data as TareaModel).id), 1);
      },
      error => {
        this.showAlert(`Hubo un error al procesar la consulta`),
        console.log(error);
      }
    );
  }

  showAlert(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false
    });
  }

}
