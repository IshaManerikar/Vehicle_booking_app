import { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

export default function StepDate({ data, updateData, prevStep }) {
  const [startDate, setStartDate] = useState(data.dateRange?.start || null);
  const [endDate, setEndDate] = useState(data.dateRange?.end || null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
  const first = data.firstName?.trim();
  const last = data.lastName?.trim();

  if (!first || !last) {
    setError('Missing name. Please go back and fill out your name.');
    setSuccess(false);
    return;
  }

  if (!startDate || !endDate || startDate >= endDate) {
    setError('Please select a valid date range.');
    setSuccess(false);
    return;
  }

  setError('');
  setSuccess(false);
  setSubmitting(true);

  try {
    const payload = {
      firstName: first,
      lastName: last,
      vehicleId: data.model && !isNaN(data.model) ? parseInt(data.model) : undefined,
      startDate,
      endDate,
    };

    const res = await axios.post('/bookings', payload);

    if (res.status === 200 && res.data?.id) {
      setSuccess(true);
      setError('');
    } else {
      setError('Booking failed. Please try again.');
      setSuccess(false);
    }
  } catch (err) {
    console.error('Booking error:', err);
    setError('Booking failed. Please try again.');
    setSuccess(false);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="text-white bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Select booking dates</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 text-sm">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select start date"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select end date"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {success ? (
          <p className="text-green-500">Your booking is successful. Thank you!</p>
        ) : error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-4 py-2 rounded text-sm transition-all duration-300 ${
            submitting
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}