import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Datos } from './models/datos' //Importamos la clase datos creada en datos.ts
import { ConexionService } from '../services/conexion.service';
import { ModalController } from '@ionic/angular';
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
              private modalCtrl: ModalController) { }

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
}
