import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {
  @ViewChild('txtInput') txtInput!: ElementRef<HTMLInputElement>; 

  constructor(private gifsService: GifsService) {}

  buscar() {
    const valor = this.txtInput.nativeElement.value;

    if (valor.trim().length == 0) {
      return;
    }
    
    this.gifsService.buscarGifs(valor);

    this.txtInput.nativeElement.value = '';
  }
}
