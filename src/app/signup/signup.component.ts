import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    data: any = {
        name: '',
        email: '',
        password: '',
        province: '',
        opt: ''
    };

    constructor() { }

    ngOnInit() { }
}
