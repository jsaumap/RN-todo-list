export interface ITask {
  id: string;
  title: string;
  priority: number;
  status: 'pending' | 'finished';
}
