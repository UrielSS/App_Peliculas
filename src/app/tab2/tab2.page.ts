import { Component } from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Pelicula} from "../interfaces/interfaces";
import {ModalController} from "@ionic/angular";
import {DetalleComponent} from "../components/detalle/detalle.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar='';
  ideas: string[]=["Spiderman", "Avenger", "El señor de los anillos", "La vida es bella"]
  peliculas: Pelicula[]=[];
  buscando: boolean = false;
  constructor(private moviesServices: MoviesService, private modalCtrl: ModalController) {

  }

  buscar(event: any) {
    const valor:string = event?.detail?.value ?? '';

    if (valor.length===0) {
      this.buscando = false;
      this.peliculas=[];
      return
    }
    this.buscando = true;
    //console.log(valor);
    this.moviesServices.buscarPeliculas(valor)
      .subscribe((resp) => {
        const resultados = (resp as any).results;
        this.peliculas = resultados;
        this.buscando = false;
      });

  }

  async detalle(id: string) {
    const modal=await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }



  protected readonly onclick = onclick;
}
