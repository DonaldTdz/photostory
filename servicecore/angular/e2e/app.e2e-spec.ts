import { photostoryTemplatePage } from './app.po';

describe('abp-project-name-template App', function() {
  let page: photostoryTemplatePage;

  beforeEach(() => {
    page = new photostoryTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
