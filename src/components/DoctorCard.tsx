import React from 'react';
import { Clock, Award, Stethoscope } from 'lucide-react';

interface DoctorCardProps {
  id: string;
  name: string;
  speciality: string;
  experience: number;
  image: string;
  isPunchedIn?: boolean;
  onPunchIn: (id: string) => void;
  loading?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  speciality,
  experience,
  image,
  isPunchedIn,
  onPunchIn,
  loading
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-4 bg-white px-3 py-1 rounded-full shadow">
          <span className="text-sm font-semibold text-gray-700">ID: {id}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-500" />
            <span>{speciality}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Award className="w-5 h-5 mr-2 text-blue-500" />
            <span>{experience} years experience</span>
          </div>
        </div>

        <button
          onClick={() => onPunchIn(id)}
          disabled={isPunchedIn || loading}
          className={`mt-6 w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition
            ${isPunchedIn 
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          <Clock className="w-5 h-5" />
          <span>
            {loading ? 'Processing...' : 
             isPunchedIn ? 'Punched In' : 'Punch In'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;