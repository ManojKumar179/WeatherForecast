import { fireEvent, render, screen } from '@testing-library/react';

import { SearchField } from './SearchField';

describe('<SearchField />', () => {
  const mockOnChangeHandler = vi.fn();

  beforeEach(() => {
    render(<SearchField onSearch={mockOnChangeHandler} />)
  });
  
  it('should render SearchField', () => {
    const searchBar = screen.getByTestId('search-bar');
    const searchIcon = screen.getByTestId('search-icon');
    const searchInput = screen.getByTestId('search-bar-input');

    expect(searchBar).toBeVisible();
    expect(searchIcon).toBeVisible();
    expect(searchInput).toBeVisible();
  });

  it('should call the handler fn on key press enter', () => {
    const searchInput = screen.getByTestId('search-bar-input');
    fireEvent.change(searchInput, { target: { value: 'California' }});
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 })
    expect(mockOnChangeHandler).toHaveBeenCalledOnce();
  });
});
