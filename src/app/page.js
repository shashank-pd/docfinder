'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import DoctorSearch from '../components/DoctorSearch';

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultationType, setSelectedConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

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

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, selectedConsultationType, selectedSpecialties]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Find Doctors</h1>
      <DoctorSearch doctors={doctors} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorListing;