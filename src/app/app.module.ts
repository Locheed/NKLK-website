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
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationControlsDirectiveComponent } from './shared/pagination-controls-directive/pagination-controls-directive.component';
import { InfobannerComponent } from './home/infobanner/infobanner.component';
import { DiscordwidgetComponent } from './home/discordwidget/discordwidget.component';
import { NewsComponent } from './home/news/news.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ScoreboardService } from './scoreboard/scoreboard.service';
import { StringFilterPipe } from './shared/filter.pipe';
import { SortByPipe } from './shared/sort-by.pipe';
import { AdminsComponent } from './admins/admins.component';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { DurationFormatPipe } from './shared/duration-format.pipe';
import { PrivacyComponent } from './privacy/privacy.component';
import { FooterComponent } from './footer/footer.component';
import { ToplistComponent } from './toplist/toplist.component';

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
    AdminsComponent,
    DurationFormatPipe,
    PrivacyComponent,
    FooterComponent,
    ToplistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'scoreboard', component: ScoreboardComponent },
      { path: 'stats/byDate', component: StatsComponent },
      { path: 'stats/AllTime', component: AllStatsComponent },
      { path: 'stats/bySoldierName', component: StatsSoldiernameComponent },
      { path: 'stats/halloffame', component: ToplistComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'privacy', component: PrivacyComponent }
    ]),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  providers: [ScoreboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
