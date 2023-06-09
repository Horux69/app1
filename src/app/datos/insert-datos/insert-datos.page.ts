import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-datos',
  templateUrl: './insert-datos.page.html',
  styleUrls: ['./insert-datos.page.scss'],
})
export class InsertDatosPage implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  form = new FormGroup({
    datNombre: new FormControl('',[Validators.minLength(3)]),
    datApellido: new FormControl('',[Validators.minLength(5)]),
    datEdad: new FormControl('',),
    datDeporte: new FormControl('',[Validators.minLength(8)]),
    datImagen: new FormControl('',[Validators.minLength(5)])
  })

  ngOnInit() {
  }


  enviarFormulario() {
    if (this.form.valid) {
      const datos = this.form.value;
      
      // Enviar solicitud POST al backend
      this.http.post('http://127.0.0.1:80', datos).subscribe(
          (response) => {
            console.log('Datos enviados correctamente');
            // Realiza acciones adicionales después de enviar los datos
          },
          (error) => {
            console.error('Error al enviar los datos', error);
            // Maneja el error de manera adecuada
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  
  }
  }
