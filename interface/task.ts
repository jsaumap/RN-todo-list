export interface ITask {
  id: string;
  description: string;
  priority: number;
  status: 'pending' | 'finished';
}
