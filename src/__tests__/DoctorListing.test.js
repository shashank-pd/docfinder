import { render, screen, fireEvent } from '@testing-library/react';
import DoctorListing from '../app/page';
import axios from 'axios';
import mockDoctorData from './mockDoctorData.json';

jest.mock('axios');

describe('Doctor Listing Page', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockDoctorData });
    render(<DoctorListing />);
  });

  it('should display doctor names', async () => {
    const doctorNames = await screen.findAllByTestId('doctor-name');
    expect(doctorNames).toHaveLength(3);
  });

  it('should filter doctors by name', async () => {
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    const doctorNames = await screen.findAllByTestId('doctor-name');
    expect(doctorNames[0]).toHaveTextContent('John Doe');
  });

  it('should filter by consultation type', async () => {
    const radioButton = screen.getByLabelText(/Video Consult/i);
    fireEvent.click(radioButton);

    const doctorNames = await screen.findAllByTestId('doctor-name');
    expect(doctorNames[0]).toHaveTextContent('Dr. John Doe');
  });

  it('should sort by fees', async () => {
    const sortSelect = screen.getByTestId('sort-fees');
    fireEvent.change(sortSelect, { target: { value: 'fees' } });

    const doctorFees = await screen.findAllByTestId('doctor-fee');
    expect(doctorFees[0]).toHaveTextContent('200');
  });
});
