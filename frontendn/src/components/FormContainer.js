import { useState } from 'react';
import StepName from './StepName';
import StepWheels from './StepWheels';
import StepVehicleType from './StepVehicleType';
import StepModel from './StepModel';
import StepDate from './StepDate';
import '../index.css';


const steps = [
  StepName,
  StepWheels,
  StepVehicleType,
  StepModel,
  StepDate,
];

export default function FormContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    model: '',
    dateRange: { start: '', end: '' },
  });

  const StepComponent = steps[currentStep];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <StepComponent
          data={formData}
          updateData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </div>
    </div>
  );
}