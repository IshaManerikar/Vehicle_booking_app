import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StepModel({ data, updateData, nextStep, prevStep }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get(`/vehicles/${data.vehicleType}`);
        setModels(res.data);
      } catch (err) {
        setError('Failed to load vehicle models.');
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [data.vehicleType]);

  const handleSelect = (modelId) => {
    updateData({ ...data, model: modelId });
  };

  return (
    <div className="text-white bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Select specific model</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="space-y-4 mb-6">
          {models.map((model) => (
            <label
              key={model.id}
              className={`block px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-300
                ${data.model === model.id
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-gray-800 border-gray-600 hover:border-indigo-500 hover:text-indigo-400'}`}
            >
              <input
                type="radio"
                name="model"
                value={model.id}
                checked={data.model === model.id}
                onChange={() => handleSelect(model.id)}
                className="hidden"
              />
              {model.brand} {model.name}
            </label>
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
          disabled={!data.model}
          className={`px-4 py-2 rounded text-sm transition-all duration-300
            ${data.model
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}