'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import DoctorSearch from '../components/DoctorSearch';
import DoctorFilters from '../components/DoctorFilters';

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    consultationMode: '',
    specialties: [],
    sortBy: ''
  });

  useEffect(() => {
    axios
      .get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then((response) => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply consultation mode filter
    if (filters.consultationMode === 'Video Consult') {
      filtered = filtered.filter((doctor) => doctor.video_consult);
    } else if (filters.consultationMode === 'In Clinic') {
      filtered = filtered.filter((doctor) => doctor.in_clinic);
    }

    // Apply specialty filters
    if (filters.specialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        filters.specialties.some((specialty) =>
          doctor.specialities?.some((s) => 
            s.name.toLowerCase() === specialty.toLowerCase()
          )
        )
      );
    }

    // Apply sorting
    if (filters.sortBy === 'fees') {
      filtered.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB;
      });
    } else if (filters.sortBy === 'experience') {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/\D/g, ''));
        const expB = parseInt(b.experience.replace(/\D/g, ''));
        return expB - expA; // High to low
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      
      switch (filterType) {
        case 'consultationMode':
          newFilters.consultationMode = value;
          break;
        case 'specialty':
          if (value.checked) {
            newFilters.specialties = [...prevFilters.specialties, value.value];
          } else {
            newFilters.specialties = prevFilters.specialties.filter(
              (s) => s !== value.value
            );
          }
          break;
        case 'sortBy':
          newFilters.sortBy = value;
          break;
        case 'reset':
          return {
            consultationMode: '',
            specialties: [],
            sortBy: ''
          };
      }
      return newFilters;
    });

    if (filterType === 'reset') {
      setSearchQuery('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-6 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent px-4 py-2">
          DoctorFinder
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-transparent">
          Your Health, Your Choice
        </h2>
      </div>

      <DoctorSearch doctors={doctors} setSearchQuery={setSearchQuery} />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 w-full">
          <DoctorFilters 
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </div>

        <div className="md:w-3/4 w-full grid grid-cols-1 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg">No doctors found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;