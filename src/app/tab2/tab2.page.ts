import { Component } from '@angular/core';
import {MoviesService} from "../services/movies.service";
import {Pelicula} from "../interfaces/interfaces";

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

  constructor(private moviesServices: MoviesService) {

  }

  buscar(event: any) {
    const valor = event?.detail?.value ?? '';
    //console.log(valor);
    this.moviesServices.buscarPeliculas(valor)
      .subscribe((resp) => {
        const resultados = (resp as any).results;
        this.peliculas = resultados;
      });

  }

  protected readonly onclick = onclick;
}
