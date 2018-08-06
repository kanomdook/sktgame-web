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
        province: '',
        district: ''
    };
    schoolList: Array<any> = [];
    provinces: Array<any> = [];
    opt: Array<any> = [];
    constructor(public api: Api) { }

    ngOnInit() {
        this.getSchools();
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
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

}
