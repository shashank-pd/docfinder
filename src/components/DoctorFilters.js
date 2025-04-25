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
    { id: "video", label: "Video Consult" },
    { id: "clinic", label: "In Clinic" }
  ];

  const handleConsultationChange = (value) => {
    const updatedFilters = { ...selectedFilters, consultationMode: value };
    setSelectedFilters(updatedFilters);
    onFilterChange('consultationMode', value);
  };

  const handleSpecialtyChange = (specialty, checked) => {
    let updatedSpecialties = [...selectedFilters.specialties];
    
    if (checked) {
      updatedSpecialties.push(specialty);
    } else {
      updatedSpecialties = updatedSpecialties.filter(s => s !== specialty);
    }
    
    const updatedFilters = { ...selectedFilters, specialties: updatedSpecialties };
    setSelectedFilters(updatedFilters);
    onFilterChange('specialty', { value: specialty, checked });
  };

  const handleSortChange = (value) => {
    const updatedFilters = { ...selectedFilters, sortBy: value };
    setSelectedFilters(updatedFilters);
    onFilterChange('sortBy', value);
  };

  const resetFilters = () => {
    // Reset internal state
    setSelectedFilters({
      consultationMode: '',
      specialties: [],
      sortBy: ''
    });
    
    // Notify parent component
    onFilterChange('reset', true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-800">Filter Options</h2>
        <button 
          onClick={resetFilters}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition font-medium text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset All
        </button>
      </div>

      {/* Consultation Mode */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Consultation Mode
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {consultationModes.map((mode) => (
            <label 
              key={mode.id} 
              className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                selectedFilters.consultationMode === mode.label 
                  ? 'bg-blue-50 border-blue-400 shadow-sm' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="consultationMode"
                value={mode.label}
                checked={selectedFilters.consultationMode === mode.label}
                onChange={() => handleConsultationChange(mode.label)}
                className="text-blue-600 mr-2"
              />
              <span className="text-gray-800">{mode.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Specialties
        </h3>
        <div className="relative">
          <div className="max-h-60 overflow-y-auto pr-2 border border-gray-200 rounded-md p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {specialties.map((specialty) => (
                <label 
                  key={specialty} 
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedFilters.specialties.includes(specialty) 
                      ? 'bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={specialty}
                    checked={selectedFilters.specialties.includes(specialty)}
                    onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                    className="text-blue-600 mr-2"
                  />
                  <span className="text-gray-800">{specialty}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort By
        </h3>
        <div className="space-y-3">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
            selectedFilters.sortBy === 'fees' 
              ? 'bg-blue-50 border-blue-400 shadow-sm' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <input
              type="radio"
              name="sortBy"
              value="fees"
              checked={selectedFilters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="text-blue-600 mr-2"
            />
            <span className="text-gray-800">Fees (Low to High)</span>
          </label>
          <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
            selectedFilters.sortBy === 'experience' 
              ? 'bg-blue-50 border-blue-400 shadow-sm' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}>
            <input
              type="radio"
              name="sortBy"
              value="experience"
              checked={selectedFilters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="text-blue-600 mr-2"
            />
            <span className="text-gray-800">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;