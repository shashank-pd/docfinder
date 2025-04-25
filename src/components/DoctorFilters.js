import React from 'react';

const DoctorFilters = ({ onFilterChange, currentFilters }) => {
  const specialties = ["Audiologist", "Ayurveda", "Dentist", "Dermatologist", "Diabetologist", "Dietitian/Nutritionist", "ENT", "General Physician", "General Surgeon", "Gynaecologist and Obstetrician", "Homeopath", "Ophthalmologist", "Orthopaedic", "Paediatrician", "Psychiatrist", "Rheumatologist"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Consultation Mode */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3" data-testid="filter-header-moc">
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="consultationMode"
              value="Video Consult"
              data-testid="filter-video-consult"
              checked={currentFilters.consultationMode === 'Video Consult'}
              onChange={(e) => onFilterChange('consultationMode', e.target.value)}
              className="text-blue-600"
            />
            <span>Video Consult</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="consultationMode"
              value="In Clinic"
              data-testid="filter-in-clinic"
              checked={currentFilters.consultationMode === 'In Clinic'}
              onChange={(e) => onFilterChange('consultationMode', e.target.value)}
              className="text-blue-600"
            />
            <span>In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3" data-testid="filter-header-speciality">
          Specialties
        </h3>
        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 pr-2">
          <div className="space-y-2">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={specialty}
                  data-testid={`filter-specialty-${specialty.replace(/[^a-zA-Z]/g, '-')}`}
                  checked={currentFilters.specialties.includes(specialty)}
                  onChange={(e) => onFilterChange('specialty', {
                    value: specialty,
                    checked: e.target.checked
                  })}
                  className="text-blue-600"
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
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
              checked={currentFilters.sortBy === 'fees'}
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
              checked={currentFilters.sortBy === 'experience'}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="text-blue-600"
            />
            <span>Experience (High to Low)</span>
          </label>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6">
        <button
          onClick={() => onFilterChange('reset')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DoctorFilters;