import { NsklPage } from './app.po';

describe('nskl App', function() {
  let page: NsklPage;

  beforeEach(() => {
    page = new NsklPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
