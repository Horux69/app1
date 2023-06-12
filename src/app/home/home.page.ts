import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatosPage } from '../datos/datos.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myName: string = ''
  constructor(private toastController: ToastController,
              private router: Router) {}
  enviar() {
    if(this.myName.length > 0){
      this.router.navigate(['../datos',this.myName])
    }
    else{
      this.presentToast()
    }
    }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Debe digitar el nombre',
        duration: 2000
      });
      toast.present();
    }

    isInputClicked: boolean = false;

  onInputFocus() {
    this.isInputClicked = true;
  }

  onInputBlur() {
    this.isInputClicked = false;
  }
}
