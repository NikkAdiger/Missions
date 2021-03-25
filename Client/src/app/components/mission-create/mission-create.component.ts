import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';

import { MissionService } from 'src/app/services/mission.service';
import { Mission } from '../../models/mission';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.css']
})
export class MissionCreateComponent implements OnInit {

  mission: Mission = new Mission();
  isNew = true;
  missionId: string = '';
  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private missionServise: MissionService
  ) { }

  ngOnInit(): void {
    this.missionServise.checkToken();
    this.activatedRoute.params.pipe(
      ((params: any) => {
        if(params.value['id']) {
          this.isNew = false;
          this.missionId = params.value['id'];
          return this.missionServise.get(params.value['id']);
        }
        return of(null);
      })
    ).subscribe((res) => {
      this.mission = new Mission(res.data.key, res.data.value);
    })
  }

  createMission(): void {
    this.missionServise.create(this.mission)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  updateMission(): void {
    this.missionServise.update(this.missionId, this.mission)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMission(): void {
    this.submitted = false;
    this.mission = new Mission();
  }

}
