import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoDTO } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  generos: generoDTO[];
  errores: string[] = [];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;


  constructor(private generosService: GeneroService) { }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.generosService.obtenerPaginado(pagina, cantidadElementosAMostrar).subscribe((respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body;
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

  borrarGenero(id: number) {
    this.generosService.borrar(id)
      .subscribe(() => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      }, error => { 
        this.errores = parsearErroresAPI(error)
      });
  }
}
