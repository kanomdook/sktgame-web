import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    data: any = {
        name: '',
        email: '',
        password: '',
        gender: '',
        province: '',
        district: ''
    };
    schoolList: Array<any> = [];
    provinces: Array<any> = [];
    opt: Array<any> = [];
    oldPassword: any = '';
    constructor(public api: Api) {

    }

    ngOnInit() {
        this.getSchools();
    }

    initFilter(e) {
        this.opt = [];
        let opts: Array<any> = [];
        opts = this.schoolList.filter(el => {
            return e === el.province;
        });

        const optList: Array<any> = [];
        opts.forEach(el => {
            if (optList.indexOf(el.district) < 0) {
                optList.push(el.district);
            }
        });

        this.opt = optList;
    }

    filterProvince(e) {
        this.opt = [];
        this.data.district = '';
        let opts: Array<any> = [];
        opts = this.schoolList.filter(el => {
            return e === el.province;
        });

        const optList: Array<any> = [];
        opts.forEach(el => {
            if (optList.indexOf(el.district) < 0) {
                optList.push(el.district);
            }
        });

        this.opt = optList;

    }

    async getSchools() {
        try {
            const res: any = await this.api.get('/schools');
            const data = res.data;
            this.schoolList = data;
            const provinces: Array<any> = [];
            data.forEach(el => {
                if (provinces.indexOf(el.province) < 0) {
                    provinces.push(el.province);
                }
            });
            this.provinces = provinces;
            this.data = JSON.parse(window.localStorage.getItem('user'));
            this.oldPassword = this.data.password;
            this.initFilter(this.data.province);
        } catch (error) {
            console.log(error);
        }
    }

    calAge(e) {
        if (e) {
            const today1 = new Date();
            const today = new Date(today1.getFullYear(), today1.getMonth(), today1.getDate());
            const birthDate = new Date(e.year, e.month - 1, e.day);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age <= 0) {
                this.data.age = 0;
                setTimeout(() => {
                    this.data.birthday = '';
                }, 200);
            } else {
                this.data.age = age;
            }
        }
    }

    async save() {
        try {
            if (this.oldPassword !== this.data.password) {
                this.data.changedPassword = true;
            } else {
                this.data.changedPassword = false;
            }
            const res: any = await this.api.put('/user/' + this.data._id, this.data);
            window.localStorage.setItem('user', JSON.stringify(res.data));
            alert('แก้ไขข้อมูลส่วนตัวสำเร็จ');
        } catch (error) {
            console.log(error);
        }
    }

}
