import { Component, OnInit,Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-janela-modal-classificar',
  templateUrl: './janela-modal-classificar.component.html',
  styleUrls: ['./janela-modal-classificar.component.css']
})


export class JanelaModalClassificarComponent {
  closeResult = '';
// Botão MODAL, cuja funcionalidade 
  funcionalidade_botao: string = 'funcionalidade_botao';

  @Input() nome_imagem: string; 

  @Input() etiqueta_imagem: string; 

  @Input()  SetInterval_avanco_certificados_automatico: any;


  constructor(private modalService: NgbModal) {
    this.nome_imagem="";
    this.etiqueta_imagem="";
  }

  open(content: any) {

//console.log("     ABRINDO    ) {  "+this.SetInterval_avanco_certificados_automatico);

clearInterval(this.SetInterval_avanco_certificados_automatico);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      this.closeResult = `PUT com a : ${result}`;
    }, (reason) => {
      this.closeResult = `inputNumber ${this.nome_imagem}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
