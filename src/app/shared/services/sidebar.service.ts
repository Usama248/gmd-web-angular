import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }
  showSideNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  showNav(showSide: boolean): void {
    this.showSideNav.next(showSide)
  }

  onShowNav(): Observable<boolean> {
    return this.showSideNav.asObservable();
  }
}
