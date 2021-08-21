import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';

import { generoCreacionDto } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  @Input()
  modelo: generoCreacionDto;

  form: FormGroup;

  @Output()
  onSubmit: EventEmitter<generoCreacionDto> = new EventEmitter<generoCreacionDto>();

  @Input()
  errores:string[]=[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }],
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo)
    }
  }

  obtenerErrorCampoNombre() {
    var campo = this.form.get('nombre');

    if (campo.hasError('required')) {
      return 'El campo es requerido';
    }

    if (campo.hasError('minlength')) {
      return 'La longitud minima es 3 caracteres'
    }

    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }

}
