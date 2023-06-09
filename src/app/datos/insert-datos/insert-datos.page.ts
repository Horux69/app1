// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ConexionService } from 'src/app/services/conexion.service';
// import { ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-insert-datos',
//   templateUrl: './insert-datos.page.html',
//   styleUrls: ['./insert-datos.page.scss'],
// })
// export class InsertDatosPage implements OnInit {
//   datos: any;

//   constructor(
//     private http: HttpClient,
//     private formBuilder: FormBuilder,
//     private conexion: ConexionService,
//     private toastController: ToastController
//   ) {}

//   form = this.formBuilder.group({
//     datNombre: ['', [Validators.minLength(3)]],
//     datApellido: ['', [Validators.minLength(5)]],
//     datEdad: [''],
//     datDeporte: ['', [Validators.minLength(8)]],
//     datImagen: ['', [Validators.minLength(5)]]
//   });

//   async presentToast(header: string, message: string) {
//     const toast = await this.toastController.create({
//       header,
//       message,
//       duration: 2000,
//       position: 'top'
//     });
//     toast.present();
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       const dat = this.form.value;
//       this.datos = dat
//       this.conexion.addDatos(this.datos).subscribe(
//         (data) => {
//           this.presentToast('Usuario Creado', 'El usuario fue creado con éxito');
//           this.form.reset();
//         },
//         (error) => {
//           this.presentToast('Error', 'Ocurrió un error al crear los datos');
//         }
//       );
//     } else {
//       this.presentToast('Error', 'Por favor, complete el formulario correctamente');
//     }
//   }

//   ngOnInit() {}
// }


import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { error } from 'console';
import { ConexionService } from 'src/app/services/conexion.service';
import { Datos } from '../models/datos';


@Component({
  selector: 'app-insert-datos',
  templateUrl: './insert-datos.page.html',
  styleUrls: ['./insert-datos.page.scss'],
})
export class InsertDatosPage implements OnInit {

/*   datos: any */
  isUpdate: boolean = false
  @Input() datos!:Partial<Datos>
  
  constructor(private http: HttpClient,
        private formBuilder: FormBuilder,
        private conexion: ConexionService,
        private toastController: ToastController,
        private modalCtrl: ModalController
      ) { }

  form = new FormGroup({
    datNombre: new FormControl('',[Validators.required]),
    datApellido: new FormControl('',[Validators.required]),
    datEdad: new FormControl('',),
    datDeporte: new FormControl('',[Validators.required]),
    datImagen: new FormControl('',[Validators.required]),
    datDescripcion: new FormControl('',[Validators.required])
  })

  async presentToast(header: string, message: string) {
        const toast = await this.toastController.create({
          header,
          message,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }

      updateDatos(){
        if (this.datos){
          this.isUpdate = true
          this.form.patchValue(
            {
              datNombre: this.datos.datNombre,
              datApellido: this.datos.datApellido,
              datEdad: this.datos.datEdad,
              datDeporte: this.datos.datDeporte,
              datImagen: this.datos.datImagen,
              datDescripcion: this.datos.datDescripcion
            }
          )
        }
      }
      
      onSubmit() {
            if (this.isUpdate){
//Modificar
              if (this.form.valid) {

               const dat: Datos = {
                datId: this.datos.datId,
                datNombre: this.form.value.datNombre!,
                datApellido: this.form.value.datApellido!,
                datEdad: this.form.value.datEdad!,
                datDeporte: this.form.value.datDeporte!,
                datImagen: this.form.value.datImagen!,
                datDescripcion: this.form.value.datDescripcion!
               }
  /*               this.datos = dat
                this.datos.datId = 0 */
                this.conexion.updateDatos(dat).subscribe(
                  (data) => {
                    this.presentToast('Usuario modificado', 'El usuario fue modificado con éxito');
                    this.modalCtrl.dismiss();
                  },
                  (error) => {
                    this.presentToast('Error', 'Ocurrió un error al modificar los datos');
                  }
              );
              } else {
                this.presentToast('Error', 'Por favor, complete el formulario correctamente');
              }

            }
            else{
// Guardar
              if (this.form.valid) {
                const dat = this.form.value;
  /*               this.datos = dat
                this.datos.datId = 0 */
                this.conexion.addDatos(dat).subscribe(
                  (data) => {
                    this.presentToast('Usuario Creado', 'El usuario fue creado con éxito');
                    this.form.reset()
                  },
                  (error) => {
                    this.presentToast('Error', 'Ocurrió un error al crear los datos');
                  }
              );
              } else {
                this.presentToast('Error', 'Por favor, complete el formulario correctamente');
              }

            }
          }

          cerrarModal() {
            this.modalCtrl.dismiss();
          }

          
          ngOnInit() {
            this.updateDatos()
          }



      // onSubmit(){
      //   const dat = this.form.value

      //   this.datos = dat
      //   this.datos.datId = 0
      //   this.conexion.addDatos(this.datos).subscribe(
      //     data => {
      //       this.presentToast('Usuario creado','El usuario fue creado con exito')
      //       this.modalCtrl.dismiss(null, 'close')
      //     }, error => {
      //         this.presentToast('Error','Ocurrio un error al crear los datos')
      //       }
          
      //   )

      // }


          
  
  }
