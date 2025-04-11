import React from 'react';
import { render } from '@testing-library/react';
import ToastMessage from '../ToastMessage';
import { toast } from 'react-toastify';


jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('ToastMessage', () => {
  it('calls toast with correct message and options', () => {
    const message = 'Test successful!';
    const toastType = 'success';

    ToastMessage({ message, toastType });


    expect(toast).toHaveBeenCalledWith(message, {
      type: toastType,
      autoClose: 3000,
      closeOnClick: true,
      position: 'top-center',
    });
  });
});
