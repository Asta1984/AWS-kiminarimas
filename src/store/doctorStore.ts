import { create } from 'zustand';
import axios from 'axios';
import { Doctor } from '../types/doctor';

interface DoctorStore {
  doctors: Doctor[];
  loadingDoctors: Record<string, boolean>;
  error: string | null;
  punchIn: (doctorId: string) => Promise<void>;
}

const useDoctorStore = create<DoctorStore>((set) => ({
  doctors: [
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      speciality: "Cardiologist",
      experience: 12,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      speciality: "Neurologist",
      experience: 8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      speciality: "Pediatrician",
      experience: 15,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    }
  ],
  loadingDoctors: {},
  error: null,
  punchIn: async (doctorId: string) => {
    try {
      // Set loading state for this specific doctor only
      set(state => ({ 
        loadingDoctors: { ...state.loadingDoctors, [doctorId]: true },
        error: null
      }));
      
      const doctor = useDoctorStore.getState().doctors.find(d => d.id === doctorId);
      
      if (!doctor) throw new Error('Doctor not found');


      const payload = {
        doctorName: doctor.name,
        punchInTime: new Date().toISOString(),
      };

      // Replace with your actual API endpoint
      await axios.post( 'https://wo2a1sbe8c.execute-api.us-east-2.amazonaws.com/devV1' , payload);

      // Update only the punched doctor's state
      set(state => ({
        doctors: state.doctors.map(d =>
          d.id === doctorId ? { ...d, isPunchedIn: true } : d
        ),
        loadingDoctors: { ...state.loadingDoctors, [doctorId]: false }
      }));
    } catch (error) {
      set(state => ({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loadingDoctors: { ...state.loadingDoctors, [doctorId]: false }
      }));
    }
  },
}));

export default useDoctorStore;