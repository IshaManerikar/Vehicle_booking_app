import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StepVehicleType({ data, updateData, nextStep, prevStep }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!data.wheels) return; // prevent API call if wheels not selected

    const fetchTypes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/vehicle-types/${data.wheels}`);
        setTypes(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load vehicle types.');
        setTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, [data.wheels]);

  const handleSelect = (typeId) => {
    updateData({ ...data, vehicleType: typeId });
  };

  return (
    <div className="text-white bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Type of vehicle?</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading vehicle types...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300
                ${data.vehicleType === type.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-gray-800 border-gray-600 hover:border-indigo-500 hover:text-indigo-400'}`}
            >
              {type.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={!data.vehicleType}
          className={`px-4 py-2 rounded text-sm transition-all duration-300
            ${data.vehicleType
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}