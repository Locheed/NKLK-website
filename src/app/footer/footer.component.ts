import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./_footer.component.sass']
})
export class FooterComponent implements OnInit {

  public year: number;

  constructor() { }

  ngOnInit() {
    // Automatically update copyright year to current year.
    const today = new Date();
    this.year = today.getFullYear();
}

}
