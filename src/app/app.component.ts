import { Component } from '@angular/core';

import { StatsService } from './shared/stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_app.component.sass'],
  providers: [StatsService]
})
export class AppComponent {
  title = 'Welcome';
}
