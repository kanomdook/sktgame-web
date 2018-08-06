import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';
import { AuthService } from '../providers/auth/auth-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterSportModalComponent } from '../register-sport-modal/register-sport-modal.component';

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
  sportsBinding: Array<any> = [];
  dataLength: any = 0;

  constructor(public api: Api, public auth: AuthService, public modalService: NgbModal) {
    this.auth.canActive();
  }

  ngOnInit() {
    this.getSports();
  }

  openModal() {
    this.modalService.open(RegisterSportModalComponent);
  }

  data() {
    setTimeout(() => {
      const sports: Array<any> = [];
      for (let i = (this.page - 1) * 10; i < this.sports.length; i++) {
        if (sports.length < 10) {
          sports.push(this.sports[i]);
        }
      }
      this.sportsBinding = sports;
      this.canRegisterSport();
    }, 500);
  }

  canRegisterSport() {
    const user: any = JSON.parse(window.localStorage.getItem('user'));
    this.sportsBinding.forEach(el => {
      let age: any = el.age.split(' ')[0];
      age = parseInt(age, 0);
      if (age === user.age || el.age === '-') {
        el.canRegis = true;
      } else {
        el.canRegis = false;
      }
    });
  }

  registerSport(sport) {
    const user: any = JSON.parse(window.localStorage.getItem('user'));
    if (user.birthday.year <= 0) {
      alert('กรุณาเพิ่มข้อมูล วัน เดือน ปี เกิด ที่ข้อมูลส่วนตัว');
    } else {
      if (!user.citizenImg.id) {
        alert('กรุณาเพิ่มข้อมูล ภาพถ่ายบัตรประชาชน ที่ข้อมูลส่วนตัว');
      } else {
        if (!user.profileImg.id) {
          alert('กรุณาเพิ่มข้อมูล รูปถ่ายประจำตัวนักกีฬา ที่ข้อมูลส่วนตัว');
        } else {
          if (user.weight <= 0) {
            alert('กรุณาเพิ่มข้อมูล น้ำหนัก ที่ข้อมูลส่วนตัว');
          } else {
            if (user.height <= 0) {
              alert('กรุณาเพิ่มข้อมูล ส่วนสูง ที่ข้อมูลส่วนตัว');
            } else {
              if (!user.gender) {
                alert('กรุณาเพิ่มข้อมูล เพศ ที่ข้อมูลส่วนตัว');
              } else {
                // call service
              }
            }
          }
        }
      }
    }
  }

  async getSports() {
    try {
      const res: any = await this.api.get('/sports');
      this.sportList = res.data;
      this.sports = res.data;
      this.dataLength = this.sports.length;
      this.data();
    } catch (error) {
      console.log(error);
    }
  }

  changeSportType(e) {
    this.page = 1;
    if (e) {
      const sports = this.sportList.filter(el => {
        return el.sportType === e;
      });
      this.sports = sports;
    } else {
      this.sports = this.sportList;
    }
    this.dataLength = this.sports.length;
    this.data();
  }

  search(e) {
    this.page = 1;
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
    this.dataLength = this.sports.length;
    this.data();
  }

}
