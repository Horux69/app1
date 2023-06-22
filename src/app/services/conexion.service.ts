import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private _refresh$ = new Subject<void>()

  get refresh$(){
    return this._refresh$
  }

  url = "http://127.0.0.1:80" //Direccion BackEnd

  constructor(private http: HttpClient) { }

  consultaDatos():Observable<any>{
    return this.http
    .get(this.url+"/consultaDatos")
  }

  addDatos(data:any):Observable<any>{
    return this.http
    .post(this.url+"/createDatos",JSON.stringify(data))
    .pipe(tap(()=>{
      this._refresh$.next
    }))
  }

  removeDatos(datId:any){
    return this.http
    .post(this.url+"/removeDatos",JSON.stringify(datId))
    .pipe(tap(()=>{
      this._refresh$.next
    }))
  }

  updateDatos(datos:any){
    return this.http
    .post(this.url+"/updateDatos",JSON.stringify(datos))
    .pipe(tap(()=>{
      this._refresh$.next
    }))
  }

}
