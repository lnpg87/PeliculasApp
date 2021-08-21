import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDto } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent implements OnInit {

  errores: string[] = [];

  constructor(private router: Router, private generoService: GeneroService) { }

  ngOnInit(): void {

  }

  guardarCambios(genero: generoCreacionDto) {
    this.generoService.crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, error => this.errores = parsearErroresAPI(error));
  }

}
