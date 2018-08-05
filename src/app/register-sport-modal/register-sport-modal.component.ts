import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-sport-modal',
  templateUrl: './register-sport-modal.component.html',
  styleUrls: ['./register-sport-modal.component.css']
})
export class RegisterSportModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  dismiss() {
    this.activeModal.dismiss();
  }

  save() {

  }

}
