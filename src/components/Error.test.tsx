import { render, screen } from '@testing-library/react';

import { Error } from './Error';

describe('<Error />', () => {
  it('should render error component', () => {
    render(<Error message='City Not Found'/>);
    const errorIcon = screen.getByTestId('error-icon');
    const errorMessage = screen.getByTestId('error-message');

    expect(errorIcon).toBeVisible();
    expect(errorMessage.textContent).toEqual('City Not Found');
  });
});
