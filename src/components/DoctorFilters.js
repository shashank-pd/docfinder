import React from 'react';

const DoctorFilters = ({ onFilterChange }) => {
  const specialties = [
    "General Physician",
    "Dentist",
    "Dermatologist",
    "Paediatrician",
    "Gynaecologist",
    "ENT",
    "Diabetologist",
    "Cardiologist"
  ];

  const consultationModes = [
    { id: "video", label: "Video Consult", testId: "filter-video-consult" },
    { id: "clinic", label: "In Clinic", testId: "filter-in-clinic" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Consultation Mode */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3" data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <div className="space-y-2">
          {consultationModes.map((mode) => (
            <label key={mode.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="consultationMode"
                value={mode.id}
                data-testid={mode.testId}
                onChange={(e) => onFilterChange('consultationMode', e.target.value)}
                className="text-blue-600"
              />
              <span>{mode.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3" data-testid="filter-header-speciality">
          Specialties
        </h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={specialty}
                data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-')}`}
                onChange={(e) => onFilterChange('specialty', { value: specialty, checked: e.target.checked })}
                className="text-blue-600"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-3" data-testid="filter-header-sort">
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="fees"
              data-testid="sort-fees"
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="text-blue-600"
            />
            <span>Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="sortBy"
              value="experience"
              data-testid="sort-experience"
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="text-blue-600"
            />
            <span>Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;