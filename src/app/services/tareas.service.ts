import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TareaModel } from '../models/tarea.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url = 'testSondeos';

  tareas: TareaModel[];

  constructor(private http: HttpClient) { }

  public getTareas(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public saveTarea(dataForm: FormGroup): Observable<any> {
    return this.http.post(this.url, dataForm.value);
  }

  public removeTarea(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
