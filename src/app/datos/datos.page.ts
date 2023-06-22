import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Datos } from './models/datos' //Importamos la clase datos creada en datos.ts
import { ConexionService } from '../services/conexion.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { InsertDatosPage } from './insert-datos/insert-datos.page';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  myName: string | null = ''
  datos!: Datos[]//Inicializamos una variable datos tipo any, que llama la clase datos y inicializa un arreglo vacio

  //datos: Array<any> = []
  constructor(private activateRoute: ActivatedRoute,
              private router: Router, 
              private conexion: ConexionService, //Llamamos conexion
              private modalCtrl: ModalController,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.myName = this.activateRoute.snapshot.paramMap.get('user')
    this.visualizaDatos()
  }

  //Creamos una funcion la cual haga la consulta de datos.
  visualizaDatos(){
    this.conexion.consultaDatos().subscribe(
      data => {
        this.datos = data
      }
    )
  }


  

  insert(){
    this.modalCtrl.create({
      component: InsertDatosPage
    })
    .then((modal) => {
      modal.present()
      return modal.onDidDismiss
    })
  }

  updateDatos(datos:Datos){
    this.modalCtrl.create({
      component: InsertDatosPage, componentProps: {datos}
    })
    .then((modal) => {
      modal.present()
      return modal.onDidDismiss
    })
  }

 /* visualizaDatos(){
    this.datos=[
      {
        opcion: "Opcion 1",
        nombre: "Camilo",
        apellido: "Castillo",
        edad: 21,
        deporte: "Crossfit",
        imagen: "https://www.crossfit.com/wp-content/uploads/2022/07/26131121/6-highintensity-1024x682.jpg"
      },
      {
        opcion: "Opcion 2",
        nombre: "Carlos",
        apellido: "Villegas",
        edad: 27,
        deporte: "Futbol",
        imagen: "https://imagenes.elpais.com/resizer/PXZUITSh7LFAQXo1xFhJa4-Z97U=/1960x1470/filters:focal(1345x592:1355x602)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/IP5UNMVVAVFW7PC2NPX6MDGHSU.jpg"
      },
      {
        opcion: "Opcion 3",
        nombre: "Cristian",
        apellido: "Ortiz",
        edad: 18,
        deporte: "Ciclismo",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Military_cyclists_in_pace_line.jpg/1200px-Military_cyclists_in_pace_line.jpg"
      }
    ]
  }*/
  interface(i:number){
    if(i == 0){
      this.router.navigate(['../crossfit'])
    }
  }

  doRefresh(event:any){
    this.datos = []
    this.conexion.consultaDatos().subscribe(
      response => {
        this.datos = response
        event.target.complete()
      }
    )
  }

  removeDatos(datId:any){
    let remove: any = {}
    remove["datId"] = datId

    this.alertController.create({
      header: 'Eliminar',
      message: '¿Esta seguro que desea eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.conexion.removeDatos(remove).subscribe(
              data => {
                this.presentToast("El usuario fue eliminado con exito")
              }
              )
          }
        }
      ]
    })
    .then((alertEl) => alertEl.present())
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
