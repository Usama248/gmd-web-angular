import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState, selectUserData } from 'src/store/store';
import { Store, select } from '@ngrx/store';
import { loadUserData } from 'src/store/actions';

@Component({
  selector: 'app-clinic-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.scss']
})
export class ClinicDashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.showUserData();
  }

  showUserData() {
    this.store.select(selectUserData).subscribe(data => {
      console.log(data);
    });
  }
}
