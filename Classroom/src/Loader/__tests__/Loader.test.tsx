import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

jest.mock('lottie-react', () => () => <div>Lottie Mock</div>);


describe('Loader component', () => {
  test('renders without crashing', () => {
    render(<Loader />);
    const animationElement = screen.getByTestId('lottie-animation');
    expect(animationElement).toBeInTheDocument();
  });
});

