export interface Workshop {
  id: number;
  type: 'conference' | 'workshop' | 'collaboration';
  title: string;
  location?: string;
  date?: string;
  url: string;
  description: string;
  techs: string[];
  category: string;
}
