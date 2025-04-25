import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DoctorListing from '../app/page';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

// Sample mock data
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialities: [{ name: 'General Physician' }],
    experience: '15 Years',
    fees: '₹ 500',
    video_consult: true,
    in_clinic: false
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialities: [{ name: 'Dentist' }],
    experience: '10 Years',
    fees: '₹ 1000',
    video_consult: false,
    in_clinic: true
  }
];

describe('Doctor Listing Tests', () => {
  beforeEach(() => {
    // Reset mocks and render component
    axios.get.mockResolvedValue({ data: mockDoctors });
    render(<DoctorListing />);
  });

  // Search functionality tests
  describe('Search Functionality', () => {
    it('should show search input with correct test id', () => {
      const searchInput = screen.getByTestId('autocomplete-input');
      expect(searchInput).toBeInTheDocument();
    });

    it('should display suggestions when typing', async () => {
      const searchInput = screen.getByTestId('autocomplete-input');
      fireEvent.change(searchInput, { target: { value: 'John' } });
      
      await waitFor(() => {
        const suggestions = screen.getAllByTestId('suggestion-item');
        expect(suggestions).toHaveLength(1);
        expect(suggestions[0]).toHaveTextContent('Dr. John Doe');
      });
    });
  });

  // Filter functionality tests
  describe('Filter Functionality', () => {
    it('should have all required filter headers', () => {
      expect(screen.getByTestId('filter-header-moc')).toBeInTheDocument();
      expect(screen.getByTestId('filter-header-speciality')).toBeInTheDocument();
      expect(screen.getByTestId('filter-header-sort')).toBeInTheDocument();
    });

    it('should have consultation mode filters', () => {
      expect(screen.getByTestId('filter-video-consult')).toBeInTheDocument();
      expect(screen.getByTestId('filter-in-clinic')).toBeInTheDocument();
    });

    it('should have specialty filters', () => {
      const specialtyFilters = [
        'General-Physician',
        'Dentist',
        'Dermatologist',
        'Paediatrician',
        'Gynaecologist',
        'ENT'
      ];

      specialtyFilters.forEach(specialty => {
        expect(screen.getByTestId(`filter-specialty-${specialty}`)).toBeInTheDocument();
      });
    });
  });

  // Sorting functionality tests
  describe('Sorting Functionality', () => {
    it('should have sort options', () => {
      expect(screen.getByTestId('sort-fees')).toBeInTheDocument();
      expect(screen.getByTestId('sort-experience')).toBeInTheDocument();
    });

    it('should sort by fees', async () => {
      const sortByFees = screen.getByTestId('sort-fees');
      fireEvent.click(sortByFees);

      await waitFor(() => {
        const fees = screen.getAllByTestId('doctor-fee');
        expect(fees[0].textContent).toBe('₹ 500');
        expect(fees[1].textContent).toBe('₹ 1000');
      });
    });

    it('should sort by experience', async () => {
      const sortByExperience = screen.getByTestId('sort-experience');
      fireEvent.click(sortByExperience);

      await waitFor(() => {
        const experiences = screen.getAllByTestId('doctor-experience');
        expect(experiences[0].textContent).toBe('15 Years');
        expect(experiences[1].textContent).toBe('10 Years');
      });
    });
  });

  // Doctor card tests
  describe('Doctor Card Display', () => {
    it('should display doctor cards with all required elements', async () => {
      await waitFor(() => {
        const cards = screen.getAllByTestId('doctor-card');
        expect(cards).toHaveLength(2);

        cards.forEach(card => {
          expect(card.querySelector('[data-testid="doctor-name"]')).toBeInTheDocument();
          expect(card.querySelector('[data-testid="doctor-specialty"]')).toBeInTheDocument();
          expect(card.querySelector('[data-testid="doctor-experience"]')).toBeInTheDocument();
          expect(card.querySelector('[data-testid="doctor-fee"]')).toBeInTheDocument();
        });
      });
    });
  });

  // Filter combination tests
  describe('Combined Filter Tests', () => {
    it('should apply multiple filters together', async () => {
      // Select video consultation
      const videoFilter = screen.getByTestId('filter-video-consult');
      fireEvent.click(videoFilter);

      // Select General Physician specialty
      const specialtyFilter = screen.getByTestId('filter-specialty-General-Physician');
      fireEvent.click(specialtyFilter);

      await waitFor(() => {
        const cards = screen.getAllByTestId('doctor-card');
        expect(cards).toHaveLength(1);
        expect(cards[0]).toHaveTextContent('Dr. John Doe');
      });
    });
  });
});