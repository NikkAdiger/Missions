import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent implements OnInit {

  missions: any;

  constructor(
    private missionService: MissionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    this.missionService.getAll()
      .subscribe(
        response => {
          this.missions = response.data;
          console.log(this.missions);
        },
        error => {
          console.log(error);
        });
  }

  onDeleteMission(mission: any) {
    this.missionService.delete(mission._id)
      .subscribe(
        res => {
          console.log(`Mission with id ${mission._id} deleted`);
          this.getMissions();
        },
        error => {
          console.error(`Mission with id ${mission._id} didn't delete`);
        }
      )
    
  }

  onEditMission(mission: any) {
    this.router.navigate(['/mission', mission._id]);
  }

}
