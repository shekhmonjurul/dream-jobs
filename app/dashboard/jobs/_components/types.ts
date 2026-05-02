export interface JobData {
  id: string;
  name: string;
  jobType: string;
  designation: string;
  vacancies: number;
  salary: string;
  status: 'Active' | 'Closed' | string;
}
