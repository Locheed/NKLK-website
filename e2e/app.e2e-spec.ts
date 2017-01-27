import { NiskalaukausBF4ServersStatisticsPage } from './app.po';

describe('niskalaukaus-bf4-servers-statistics App', function() {
  let page: NiskalaukausBF4ServersStatisticsPage;

  beforeEach(() => {
    page = new NiskalaukausBF4ServersStatisticsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
