interface Doctor {
  _id: string;
  name: string;
  image: string;
  specialty: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fee: number;
  address: { line1: string; line2: string };
  date: number;
  slotsBooked: Record<string, string[]>;
}

interface Appointment {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    image: string;
  };
  docData: {
    name: string;
    specialty: string;
    fee: number;
    image: string;
    address: { line1: string; line2: string };
  };
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
}

interface AdminDashboardData {
  appointments: number;
  doctors: number;
  patients: number;
  latestAppointments: Appointment[];
}

interface DoctorDashboardData {
  earnings: number;
  appointments: number;
  patients: number;
  latestAppointments: Appointment[];
}
