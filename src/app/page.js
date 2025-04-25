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
  const [selectedConsultationType, setSelectedConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');

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

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Consultation Type Filter
    if (selectedConsultationType === 'Video') {
      filtered = filtered.filter((doctor) => doctor.video_consult);
    } else if (selectedConsultationType === 'Clinic') {
      filtered = filtered.filter((doctor) => doctor.in_clinic);
    }

    // Specialties Filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        selectedSpecialties.some((specialty) =>
          doctor.specialities.some((s) => s.name === specialty)
        )
      );
    }

    // Sorting
    if (sortOption === 'fees') {
      filtered.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB;
      });
    } else if (sortOption === 'experience') {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience.replace(/[^\d]/g, ''));
        const expB = parseInt(b.experience.replace(/[^\d]/g, ''));
        return expB - expA;
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, selectedConsultationType, selectedSpecialties, sortOption]);

  const handleFilterChange = (filterType, filterData) => {
    if (filterType === 'consultationMode') {
      setSelectedConsultationType(filterData);
    } else if (filterType === 'specialty') {
      const updatedSpecialties = filterData.checked
        ? [...selectedSpecialties, filterData.value]
        : selectedSpecialties.filter((s) => s !== filterData.value);
      setSelectedSpecialties(updatedSpecialties);
    } else if (filterType === 'sortBy') {
      setSortOption(filterData);
    } else if (filterType === 'reset') {
      setSelectedConsultationType('');
      setSelectedSpecialties([]);
      setSortOption('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Find Doctors</h1>

      <DoctorSearch doctors={doctors} setSearchQuery={setSearchQuery} />

      <div className="flex gap-6">
        <div className="w-1/4 sticky top-4 h-fit">
          <DoctorFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="w-3/4 grid grid-cols-1 md:grid-cols-1 gap-6">
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
