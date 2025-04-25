import React, { useState } from 'react';

const DoctorFilters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    consultationMode: '',
    specialties: [],
    sortBy: ''
  });

  const specialties = [
    "Audiologist",
    "Ayurveda",
    "Dentist",
    "Dermatologist",
    "Diabetologist",
    "Dietitian/Nutritionist",
    "ENT",
    "General Physician",
    "General Surgeon",
    "Gynaecologist and Obstetrician",
    "Homeopath",
    "Ophthalmologist",
    "Orthopaedic",
    "Paediatrician",
    "Psychiatrist",
    "Rheumatologist"
  ];

 
  const consultationModes = [
    { id: "video", label: "Video" },
    { id: "clinic", label: "Clinic" }
  ];

  const handleConsultationChange = (value) => {
    const updatedFilters = { ...selectedFilters, consultationMode: value };
    setSelectedFilters(updatedFilters);
    onFilterChange('consultationMode', value);
  };

  const handleSpecialtyChange = (specialty, checked) => {
    let updated = [...selectedFilters.specialties];
    checked ? updated.push(specialty) : updated = updated.filter(s => s !== specialty);
    setSelectedFilters({ ...selectedFilters, specialties: updated });
    onFilterChange('specialty', { value: specialty, checked });
  };

  const handleSortChange = (value) => {
    const updatedFilters = { ...selectedFilters, sortBy: value };
    setSelectedFilters(updatedFilters);
    onFilterChange('sortBy', value);
  };

  const resetFilters = () => {
    setSelectedFilters({ consultationMode: '', specialties: [], sortBy: '' });
    onFilterChange('reset', true);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow border w-80 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-blue-800">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-blue-600 hover:underline text-xs"
        >
          Reset
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-blue-700 mb-2">Consultation</h3>
        <div className="space-y-1">
          {consultationModes.map((mode) => (
            <label key={mode.id} className="flex items-center">
              <input
                type="radio"
                name="consultationMode"
                value={mode.label}
                checked={selectedFilters.consultationMode === mode.label}
                onChange={() => handleConsultationChange(mode.label)}
                className="mr-1"
              />
              {mode.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-blue-700 mb-2">Specialties</h3>
        <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto text-xs">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                value={specialty}
                checked={selectedFilters.specialties.includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                className="mr-1"
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-blue-700 mb-2">Sort By</h3>
        <div className="space-y-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              value="fees"
              checked={selectedFilters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="mr-1"
            />
            Fees
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              value="experience"
              checked={selectedFilters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="mr-1"
            />
            Experience
          </label>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;