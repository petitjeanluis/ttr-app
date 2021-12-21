import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input()
  closeable: boolean = false

  constructor(private element: ElementRef) {
    this.closeModal()
    document.body.append(element.nativeElement)
  }

  closeModal() {
    this.element.nativeElement.style.display = 'none'
  }

  openModal() {
    this.element.nativeElement.style.display = 'block'
  }

}
