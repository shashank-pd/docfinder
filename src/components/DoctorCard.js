import {
  Video,
  Stethoscope,
  Star,
  Clock,
  MapPin,
  Languages,
} from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const specialtiesList = doctor.specialities?.map((s) => s.name).join(", ") || "";
  const clinicAddress = doctor.clinic?.address;
  const fullAddress = clinicAddress
    ? `${clinicAddress.address_line1}, ${clinicAddress.locality}, ${clinicAddress.city}`
    : "";

  return (
    <div
      data-testid="doctor-card"
      className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl bg-white transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left column: Doctor's photo and stats */}
        <div className="bg-blue-50 p-6 flex flex-col items-center justify-center lg:w-64 rounded-l-xl">
          <div className="relative mb-4">
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-md">
              <Star size={16} className="fill-current shrink-0" />
              {doctor.rating || "4.8"}
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-2 mb-3 bg-blue-100 px-4 py-2 rounded-full text-blue-800">
            <Clock size={18} className="shrink-0" />
            <p data-testid="doctor-experience" className="font-medium text-sm">
              {doctor.experience}
            </p>
          </div>

          {/* Fee */}
          <div className="bg-green-50 py-3 px-6 rounded-lg border border-green-200 w-full text-center">
            <p className="text-xs text-green-700 uppercase font-semibold">
              Consultation Fee
            </p>
            <p
              data-testid="doctor-fee"
              className="text-xl font-bold text-green-700"
            >
              {doctor.fees}
            </p>
          </div>
        </div>

        {/* Middle column: Info */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div>
              <h2
                data-testid="doctor-name"
                className="text-2xl font-bold text-gray-800"
              >
                {doctor.name}
              </h2>
              <p
                data-testid="doctor-specialty"
                className="text-md text-blue-600 font-medium mt-1"
              >
                {specialtiesList}
              </p>
            </div>

            {doctor.clinic?.name && (
              <div className="flex items-center gap-2 mt-3 lg:mt-0 bg-gray-50 px-4 py-2 rounded-lg">
                {clinicAddress?.logo_url && (
                  <img
                    src={clinicAddress.logo_url}
                    alt="clinic logo"
                    className="h-8 w-8 object-contain"
                  />
                )}
                <p className="text-sm font-semibold text-gray-700">
                  {doctor.clinic.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {clinicAddress && (
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin
                  size={18}
                  className="shrink-0 mt-1 text-blue-500"
                />
                <p data-testid="doctor-address" className="text-sm">
                  {fullAddress}
                </p>
              </div>
            )}

            {doctor.languages?.length > 0 && (
              <div className="flex items-start gap-2 text-gray-700">
                <Languages
                  size={18}
                  className="shrink-0 mt-1 text-blue-500"
                />
                <p data-testid="doctor-languages" className="text-sm">
                  <span className="font-medium">Languages:</span>{" "}
                  {doctor.languages.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Action Buttons */}
        <div className="p-6 flex flex-col justify-center lg:w-64 lg:border-l border-gray-100">
          <div className="space-y-4">
            {doctor.video_consult && (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md">

                <Video size={20} className="shrink-0" />
                Book Video Consult
              </button>
            )}
            {doctor.in_clinic && (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md">

                <Stethoscope size={20} className="shrink-0" />
                Book Clinic Visit
              </button>
            )}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 hover:scale-105 transition-all duration-300">

            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
