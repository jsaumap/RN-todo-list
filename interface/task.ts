export interface ITask {
  id: string;
  title: string;
  priority: string;
  status: 'pending' | 'finished';
}
