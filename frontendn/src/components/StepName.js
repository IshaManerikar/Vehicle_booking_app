import { useState } from 'react';



export default function StepName({ data, updateData, nextStep }) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.firstName || !data.lastName) {
      setError('Please fill out both fields.');
      return;
    }
    setError('');
    nextStep();
  };

  return (
    <div className="min-h-screen bg-[url('/your-background.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Rideos</h1>
        <p className="text-center text-indigo-300 mb-6">Drive your dreams!</p>
        <h2 className="text-xl font-semibold mb-4 text-center">First, what's your name?</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={(e) => updateData({ ...data, firstName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={(e) => updateData({ ...data, lastName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}