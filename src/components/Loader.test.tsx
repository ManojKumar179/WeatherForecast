import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('<Loader />', () => {
  it('should render loader', () => {
    render(<Loader size={32} />)

    const loader = screen.getByTestId('loader');

    expect(loader).toBeVisible();    
  });
});