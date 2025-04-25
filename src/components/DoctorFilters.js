

const DoctorFilters = ({
    selectedConsultationType,
    setSelectedConsultationType,
    selectedSpecialties,
    setSelectedSpecialties,
    setSortBy,
  }) => {
    const specialties = [
      "General Physician",
      "Dentist",
      "Dermatologist",
      "Paediatrician",
      "Gynaecologist",
      // Add more specialties as needed
    ];
  
    const handleSpecialtyChange = (specialty) => {
      if (selectedSpecialties.includes(specialty)) {
        setSelectedSpecialties(
          selectedSpecialties.filter((item) => item !== specialty)
        );
      } else {
        setSelectedSpecialties([...selectedSpecialties, specialty]);
      }
    };
  
    return (
      <div className="mb-6">
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <div>
          <label>
            <input
              type="radio"
              name="consultationMode"
              data-testid="filter-video-consult"
              checked={selectedConsultationType === "Video Consult"}
              onChange={() => setSelectedConsultationType("Video Consult")}
            />
            Video Consult
          </label>
          <label>
            <input
              type="radio"
              name="consultationMode"
              data-testid="filter-in-clinic"
              checked={selectedConsultationType === "In Clinic"}
              onChange={() => setSelectedConsultationType("In Clinic")}
            />
            In Clinic
          </label>
        </div>
  
        <h3 data-testid="filter-header-speciality">Specialty</h3>
        <div>
          {specialties.map((specialty) => (
            <label key={specialty}>
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace(
                  / /g,
                  "-"
                )}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              {specialty}
            </label>
          ))}
        </div>
  
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div>
          <label>
            <input
              type="radio"
              name="sortBy"
              data-testid="sort-fees"
              onChange={() => setSortBy("fees")}
            />
            Fees (Ascending)
          </label>
          <label>
            <input
              type="radio"
              name="sortBy"
              data-testid="sort-experience"
              onChange={() => setSortBy("experience")}
            />
            Experience (Descending)
          </label>
        </div>
      </div>
    );
  };

  // ...existing code...
const filterDoctors = (doctors: Doctor[]) => {
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
  
    return filtered;
  };
  // ...existing code...
  
  export default DoctorFilters;