import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button'

describe('Button Component', () => {
  test('renders with text content', () => {
    render(<Button action="Click me" />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button action="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button action="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('applies the correct className', () => {
    render(<Button action="Styled" className="my-button" />);
    expect(screen.getByRole('button')).toHaveClass('my-button');
  });

  test('renders a ReactNode in action', () => {
    render(<Button action={<span data-testid="icon">🚀</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('uses the correct button type', () => {
    render(<Button action="Submit" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
