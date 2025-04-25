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
  const [sortOption, setSortOption] = useState('');  // To store the selected sorting option

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
    if (selectedConsultationType === 'Video Consult') {
      filtered = filtered.filter(doctor => doctor.video_consult);
    } else if (selectedConsultationType === 'In Clinic') {
      filtered = filtered.filter(doctor => doctor.in_clinic);
    }

    // Specialties Filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        selectedSpecialties.some((specialty) =>
          doctor.specialities.some(s => s.name === specialty)
        )
      );
    }

    // Sort Logic
    if (sortOption === 'fees') {
      filtered = filtered.sort((a, b) => {
        // Extract numeric value from fees string (removing '₹' and any spaces)
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB;
      });
    } else if (sortOption === 'experience') {
      filtered = filtered.sort((a, b) => {
        // Extract numeric value from experience string (removing 'years' and any text)
        const expA = parseInt(a.experience.replace(/[^\d]/g, ''));
        const expB = parseInt(b.experience.replace(/[^\d]/g, ''));
        return expB - expA; // Sort experience in descending order
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
        : selectedSpecialties.filter(specialty => specialty !== filterData.value);
      setSelectedSpecialties(updatedSpecialties);
    } else if (filterType === 'sortBy') {
      setSortOption(filterData);  // Update sort option
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Find Doctors</h1>
      
      {/* Doctor Search Bar */}
      <DoctorSearch doctors={doctors} setSearchQuery={setSearchQuery} />

      {/* Filters Section */}
      <div className="flex gap-6">
        <div className="w-1/4">
          <DoctorFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Doctor Cards */}
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-1 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
