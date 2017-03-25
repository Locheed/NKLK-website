import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./_nav.component.sass']
})
export class NavComponent implements OnInit {
  private daysLeft = 35;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
