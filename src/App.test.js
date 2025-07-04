import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';

test('renders Weather App heading', () => {
  render(<App />);
  expect(screen.getByText(/weather app/i)).toBeInTheDocument();
});

test('SearchBar calls onSearch when form is submitted', async () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByPlaceholderText(/enter city/i);
  await userEvent.type(input, 'London');
  await userEvent.click(screen.getByRole('button'));
  expect(onSearch).toHaveBeenCalledWith('London');
});

test('CurrentWeatherCard displays weather details', () => {
  const data = {
    name: 'London',
    main: { temp: 20, humidity: 80 },
    wind: { speed: 5 },
    weather: [{ description: 'Cloudy', icon: '04d' }],
  };

  render(<CurrentWeatherCard data={data} units="metric" />);

  expect(screen.getByText(/temperature: 20°c/i)).toBeInTheDocument();
  expect(screen.getByText(/humidity: 80%/i)).toBeInTheDocument();
  expect(screen.getByText(/wind: 5 m\/s/i)).toBeInTheDocument();
});
