export default function StepWheels({ data, updateData, nextStep, prevStep }) {
  const options = ['2', '3', '4'];

  const handleSelect = (value) => {
    updateData({ ...data, wheels: value });
  };

  return (
    <div className="text-white bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Number of wheels?</h2>

      <div className="flex justify-center gap-6 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`px-6 py-3 rounded-full border-2 transition-all duration-300
              ${data.wheels === option
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-gray-800 border-gray-600 hover:border-indigo-500 hover:text-indigo-400'}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={!data.wheels}
          className={`px-4 py-2 rounded text-sm transition-all duration-300
            ${data.wheels
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}