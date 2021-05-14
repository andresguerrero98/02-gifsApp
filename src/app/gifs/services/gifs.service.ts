import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  

    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
    

  }


  // async buscarGifs( query: string = '') { //Metodo asincrono con fetch() y json()

  //   query = query.trim().toLocaleLowerCase()

  //   if (!this._historial.includes(query)) {
  //     this._historial.unshift(query.trim().toLocaleLowerCase());
  //     this._historial = this._historial.splice(0, 10);
  //   }

  //   this.url = 'https://api.giphy.com/v1/gifs/search?api_key=TquXRJu5ldNv1Ir67UtNyBWugRc2S3VW&q=' + query + '&limit=' + this.limit;

  //   const resp = await fetch(this.url);
  //   const data = await resp.json();
  //   console.log(data);

  // }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial )  );
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query );

    this.http.get<SearchGIFResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados )  );
      });

  }


}
