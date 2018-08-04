import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    data: any = {
        email: '',
        password: ''
    };

    constructor(public api: Api) { }

    ngOnInit() { }

    async login() {
        try {
            const res: any = await this.api.post('/user/signin', this.data);
            alert('เข้าสู่ระบบสำเร็จ');
            alert(JSON.stringify(res.data));
        } catch (error) {
            this.data = {
                email: '',
                password: ''
            };
            console.log(error);
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    }
}
