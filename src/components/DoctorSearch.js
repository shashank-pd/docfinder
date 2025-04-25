import { useState } from 'react';

const DoctorSearch = ({ doctors, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const matches = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        data-testid="autocomplete-input"
        onChange={handleInputChange}
        placeholder="Search doctor by name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 border border-gray-300 rounded-md bg-white z-10">
          {suggestions.map((doctor) => (
            <li
              key={doctor.id}
              data-testid="suggestion-item"
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchQuery(doctor.name);
                setSuggestions([]);
              }}
            >
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorSearch;