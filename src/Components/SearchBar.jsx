import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Cari..."}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
