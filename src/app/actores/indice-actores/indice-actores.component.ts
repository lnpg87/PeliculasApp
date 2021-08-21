import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  constructor(private actoresService:ActoresService) { }

  actores:actorDTO[];
  errores: string[] = [];
  columnasAMostrar = ['id', 'nombre', 'fechaNacimiento','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.actoresService.obtenerTodos(pagina, cantidadElementosAMostrar).subscribe((respuesta: HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body;
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, (error) => {
      this.errores = parsearErroresAPI(error)
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrarActor(id:number){
    this.actoresService.borrar(id)
      .subscribe(() => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      }, error => { 
        this.errores = parsearErroresAPI(error)
      });
  }

}
