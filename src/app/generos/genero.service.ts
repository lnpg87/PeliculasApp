import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDto, generoDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + 'generos';

  public obtenerPaginado(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiUrl, {observe: 'response', params});
  }

  public obtenerTodos(){
    return this.http.get<generoDTO[]>(`${this.apiUrl}/todos`);
  }

  public obtenerPorId(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>(`${this.apiUrl}/${id}`);
  }

  public crear(genero: generoCreacionDto) {
    return this.http.post(this.apiUrl, genero);
  }

  public editar(id: number, genero: generoCreacionDto){
    return this.http.put(`${this.apiUrl}/${id}`, genero);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
