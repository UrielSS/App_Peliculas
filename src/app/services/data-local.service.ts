import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.init(); // ✅ Inicializar correctamente el storage
  }

  async init() {
    this._storage = await this.storage.create();
    await this.cargarFavoritos(); // ✅ Solo se llama cuando el storage está listo
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  guardaPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = "";

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = "Removido de favoritos";
    } else {
      this.peliculas.push(pelicula);
      mensaje = "Agregado a favoritos";
    }

    this.presentToast(mensaje);
    this._storage!.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavoritos() {
    if (!this._storage) await this.init();

    const peliculas = await this._storage!.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: string): Promise<boolean> {
    if (!this._storage) await this.init();

    await this.cargarFavoritos();

    const idNum = Number(id);
    const existe = this.peliculas.find(peli => peli.id === idNum);

    return !!existe;
  }
}
