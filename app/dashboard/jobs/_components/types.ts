export interface JobData {
  id: string;
  name: string;
  company: string;
  designation: string;
  vacancies: number;
  salary: string;
  status: 'Active' | 'Closed' | string;
}
