/****************************************************


****************************************************/

import { Component, Input, OnInit, Output } from '@angular/core';

//Essencial para capturar os eventos do teclado:
import { HostListener } from '@angular/core';

// Coletando o parametro ETIQUETA pode-se consultar o DB para ver as classificações

import { ActivatedRoute } from '@angular/router';

// Serviço para consomer a API (método GET) 

import { GetFotosBucketService } from '../../services/servico-get-lista-fotos/get-fotos-bucket.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,

  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-novos',
  templateUrl: './novos.component.html',
  styleUrls: ['./novos.component.css']
})


export class NovosComponent implements OnInit {

  etiqueta="juridico";

  indice_imagen=0;

  maximo_indice_imagen=0;

  imagem: String[]=[];

  // Comuta o controle de Avanço cada vez que for aberta/fecahada a Janela Modal
  //@Output()  
  SetInterval_avanco_certificados_automaticoBIDIRECTIONAL: any;
  
  constructor(private activatedRoute: ActivatedRoute,private getFotosBucketService: GetFotosBucketService) {
  }

  /*
  Quando for procurado (https://docker-2-julian.herokuapp.com/saida_oficina/saida_oficina)
  ele vai coletar o parametro da URL 
  
  (  { path: ':parametro/:parametro'<----------------------------,
)
  Lembremos da definicao do APP-ROUTING.MODULE.TS:

    { path: ':parametro/:parametro', component: NovosComponent },

   */
ngOnInit() {
    
    const par = this.activatedRoute.snapshot.paramMap.get('parametro');
    this.etiqueta=par+"";
    this.getUrl_imagem_METODO();
//Para que as imagens avancem de forma automática
    this.avanco_certificados_automatico(this.indice_imagen);
}

public  avanco_certificados_automatico(entrada:number)
{
  
  this.SetInterval_avanco_certificados_automaticoBIDIRECTIONAL = setInterval(() => { this.avanco_certificados(entrada); }, 3*1000); 
  
  //console.log("avanco_certificados_automatico "+this.SetInterval_avanco_certificados_automatico);

}

avanco_certificados(entrada:number) {
  if(this.indice_imagen === this.maximo_indice_imagen) 
  {
    this.indice_imagen=0;
    console.log("avanco_certificados   "+this.indice_imagen);
  }
  this.indice_imagen++;  
}


@HostListener('window:keyup', ['$event'])
keyEvent(event: KeyboardEvent) {
  //console.log("@HostListener('window:keyup', ['$event'])  " +event);

  if (event.keyCode  === 27) {
    clearInterval(this.SetInterval_avanco_certificados_automaticoBIDIRECTIONAL);
    console.log('Escape!        '+this.SetInterval_avanco_certificados_automaticoBIDIRECTIONAL);
    
    this.avanco_certificados_automatico(this.indice_imagen);

 }

  if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
    this.increment();
  }

  if (event.keyCode === KEY_CODE.LEFT_ARROW) {
    this.decrement();
  }

//Verticais para acelerar a navegação:

  if (event.keyCode === KEY_CODE.UP_ARROW) {
    this.increment_10();
  }

  if (event.keyCode === KEY_CODE.DOWN_ARROW) {
    this.decrement_10();
  }
}

  increment() {    

    if((this.indice_imagen+1)<this.maximo_indice_imagen)
    {
      this.indice_imagen++;    
    }    
  }

  decrement() {

    if(this.indice_imagen>0)
    {
      this.indice_imagen--;
    }    
  }
//Verticais para acelerar a navegação, em passos de 10
  increment_10() {
    
    if((this.indice_imagen+10)<this.maximo_indice_imagen)
    {
      this.indice_imagen+=10;
    }    
  }

  decrement_10() {

    if(this.indice_imagen>10)
    {
      this.indice_imagen-=10;
    }     
  }

/****************************************************


****************************************************/

// Chama o serviço para obtém todas as fotos

  url_foto : String[] | undefined;  

  getUrl_imagem_METODO() {
    this.getFotosBucketService.getUrl_imagem(this.etiqueta).subscribe((url_foto: String[]) => {
      this.imagem = url_foto.reverse();    
      this.maximo_indice_imagen=url_foto.length;  
      
    });
  }

///////
}


