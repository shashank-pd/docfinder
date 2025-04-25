const DoctorCard = ({ doctor }) => {
    const specialtiesList = doctor.specialities?.map(s => s.name).join(", ") || "";
    
    return (
      <div data-testid="doctor-card" className="border p-4 rounded-md shadow-lg">
        <div className="flex items-center gap-4">
          <img 
            src={doctor.photo} 
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 data-testid="doctor-name" className="text-xl font-bold">
              {doctor.name}
            </h2>
            <p data-testid="doctor-specialty" className="text-gray-600">
              {specialtiesList}
            </p>
            <p data-testid="doctor-experience" className="text-sm text-gray-500">
              {doctor.experience}
            </p>
            <p data-testid="doctor-fee" className="font-semibold text-green-600">
              {doctor.fees}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>{doctor.doctor_introduction}</p>
          <p className="mt-2">
            <span className="font-semibold">Languages:</span> {doctor.languages.join(", ")}
          </p>
          <div className="mt-2">
            <span className="font-semibold">Available for:</span>
            <div className="flex gap-2 mt-1">
              {doctor.video_consult && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                  Video Consult
                </span>
              )}
              {doctor.in_clinic && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                  In Clinic
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DoctorCard;