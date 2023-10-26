import { render, RenderResult } from "../../../../test/render";

import Home from './Home';

describe('Home', () => {
  let wrapper: RenderResult;

  it('should render', () => {
    wrapper = render(<Home />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
