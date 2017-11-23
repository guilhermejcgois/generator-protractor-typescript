import { AppPage } from './app.po';

describe('<%= projectName %> App', () => {
  let page: AppPage;

  const initialUrl = '<%= initialUrl %>';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to ' + initialUrl, () => {
    expect(page.getUrl()).toContain(initialUrl);
  });
});
