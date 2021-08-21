import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  errores: string[] = [];

  constructor(private actoresService: ActoresService, private route: Router) { }

  ngOnInit(): void {

  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.crear(actor).subscribe(() => {
      this.route.navigate(["/actores"]);
    }, errores => { this.errores = parsearErroresAPI(errores) })
  }

}
