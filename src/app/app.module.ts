import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NavComponent } from './nav/nav.component';
import { AllStatsComponent } from './all-stats/all-stats.component';
import { StatsSoldiernameComponent } from './stats-soldiername/stats-soldiername.component';
import { HomeComponent } from './home/home.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { PaginationControlsDirectiveComponent } from './shared/pagination-controls-directive/pagination-controls-directive.component';
import { InfobannerComponent } from './home/infobanner/infobanner.component';
import { DiscordwidgetComponent } from './home/discordwidget/discordwidget.component';
import { NewsComponent } from './home/news/news.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoreboardService } from './scoreboard/scoreboard.service';
import { StringFilterPipe } from './shared/filter.pipe';
import { SortByPipe } from './shared/sort-by.pipe';
import { AdminsComponent } from './admins/admins.component';


@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    NavComponent,
    AllStatsComponent,
    StatsSoldiernameComponent,
    HomeComponent,
    PaginationControlsDirectiveComponent,
    InfobannerComponent,
    DiscordwidgetComponent,
    NewsComponent,
    ScoreboardComponent,
    StringFilterPipe,
    SortByPipe,
    AdminsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    Ng2PaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'scoreboard', component: ScoreboardComponent },
      { path: 'stats/byDate', component: StatsComponent },
      { path: 'stats/AllTime', component: AllStatsComponent },
      { path: 'stats/bySoldierName', component: StatsSoldiernameComponent },
      { path: 'admins', component: AdminsComponent }
    ])
  ],
  providers: [ScoreboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
