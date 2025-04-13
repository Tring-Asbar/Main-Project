import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';

// Simple mock for the signIn function with proper syntax
jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn(),
}));

describe('Login Component Simple Test', () => {
  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Check if the username input, password input, and login button are in the document
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('successful login calls signIn with the correct credentials', async () => {
    // Set up mock behavior for signIn: resolve successfully.
    (signIn as jest.Mock).mockResolvedValueOnce({});
    
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'testpassword' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Verify that signIn is called with the provided username and password
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
    });
  });
});
