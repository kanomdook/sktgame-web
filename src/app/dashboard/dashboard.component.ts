import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page = 1;
  sportType: any = '';
  keyword: any = '';
  sportList: Array<any> = [];
  sports: Array<any> = [];
  dataLength: any = 0;

  constructor(public api: Api) { }

  ngOnInit() {
    this.getSports();
  }

  data() {
    setTimeout(() => {
      console.log(this.page);
    }, 500);
  }

  async getSports() {
    try {
      const res: any = await this.api.get('/sports');
      this.sportList = res.data;
      this.dataLength = this.sportList.length;
      this.sports = res.data;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  changeSportType(e) {
    if (e) {
      const sports = this.sportList.filter(el => {
        return el.sportType === e;
      });
      this.sports = sports;
    } else {
      this.sports = this.sportList;
    }
  }

  search(e) {
    this.sportType = '';
    if (e) {
      const sports = this.sportList.filter(el => {
        const reg = new RegExp(e, 'i');
        if (el.sportType.match(reg) || el.name.match(reg) || el.age.match(reg)) {
          return el;
        }
      });
      this.sports = sports;
    } else {
      this.sports = this.sportList;
    }
  }

}
