import { UserRound } from 'lucide-react';
import DoctorCard from './components/DoctorCard';
import useDoctorStore from './store/doctorStore';

function App() {
  const { doctors, loadingDoctors, punchIn } = useDoctorStore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <UserRound className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Doctor Attendance System</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              {...doctor}
              onPunchIn={punchIn}
              loading={loadingDoctors[doctor.id] || false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;