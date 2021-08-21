import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO } from '../actores';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  imagenCambiada = false;

  form: FormGroup;

  @Input()
  modelo: actorCreacionDTO;

  @Input()
  errores: string[] = [];

  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo)
    }
  }

  onSubmit() {

    if (!this.imagenCambiada) {
      this.form.patchValue({ 'foto': null });
    }

    this.OnSubmit.emit(this.form.value)
  }

  cambioMarkdown(texto: string) {
    this.form.get('biografia').setValue(texto);
  }

  archivoSeleccionado(file) {
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  change() {

  }
}
