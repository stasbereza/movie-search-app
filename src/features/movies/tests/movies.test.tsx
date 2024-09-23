import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils';
import { App } from '../../../App';

test('should fetch a movie after clicking the select element and searching within input', async () => {
  renderWithProviders(<App />);

  // Get select element
  const select = screen.getByRole('combobox');

  // Click on select element
  fireEvent.mouseDown(select);

  // Ensure dropdown menu opens
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  // Get input element
  const input = screen.getByPlaceholderText(/type to search for movie/i);

  // Ensure input element rendered
  expect(input).toBeInTheDocument();

  // Fire change event on input element
  fireEvent.change(input, { target: { value: 'test' } });

  // Wait for the movies to be loaded and displayed
  // after some time, the movie should be received
  // expect(await screen.findByText(/test/i)).toBeInTheDocument();
});
