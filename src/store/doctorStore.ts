import { create } from 'zustand';
import axios from 'axios';
import { Doctor } from '../types/doctor';

interface DoctorStore {
  doctors: Doctor[];
  loading: boolean;
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
  loading: false,
  error: null,
  punchIn: async (doctorId: string) => {
    try {
      set({ loading: true, error: null });
      const doctor = useDoctorStore.getState().doctors.find(d => d.id === doctorId);
      
      if (!doctor) throw new Error('Doctor not found');

      const payload = {
        doctorName: doctor.name,
        timestamp: new Date().toISOString(),
      };

      // Replace with your actual API endpoint
      await axios.post('https://api.example.com/attendance', payload);

      set(state => ({
        doctors: state.doctors.map(d =>
          d.id === doctorId ? { ...d, isPunchedIn: true } : d
        ),
        loading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },
}));

export default useDoctorStore;