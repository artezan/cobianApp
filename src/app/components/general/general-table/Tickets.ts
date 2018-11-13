export interface TicketsData {
  hours: number;
  description: string;
  customer: string;
  ranking: number;
  consultant: string;
  timestamp: Date;
  status: string;
  cost: number;
  isPay: boolean;
  id: any;
}
export const TICKETS: TicketsData[] = [
  {
    id: 1,
    hours: 8,
    description: 'Solucionar Problema...',
    customer: 'Cliente 1',
    ranking: 2,
    consultant: 'Consultor 54',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: true,
  },
  {
    id: 2,
    hours: 5,
    description: 'Solucionar Problema...',
    customer: 'Cliente 2',
    ranking: 5,
    consultant: 'Consultor 2',
    timestamp: new Date(Date.now()),
    status: 'Atendiendo',
    cost: 15000,
    isPay: false,
  },
  {
    id: 3,

    hours: 4,
    description: 'Solucionar Problema...',
    customer: 'Cliente 3',
    ranking: 3,
    consultant: 'Consultor 6',
    timestamp: new Date(Date.now()),
    status: 'Concluido',
    cost: 15000,
    isPay: true,
  },
  {
    id: 4,

    hours: 10,
    description: 'Solucionar Problema...',
    customer: 'Cliente 4',
    ranking: 1,
    consultant: 'Consultor 16',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: true,
  },
  {
    id: 5,

    hours: 7,
    description: 'Solucionar Problema...',
    customer: 'Cliente 5',
    ranking: 4,
    consultant: 'Consultor 4',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: false,
  },
  {
    id: 6,

    hours: 9,
    description: 'Solucionar Problema...',
    customer: 'Cliente 6',
    ranking: 4,
    consultant: 'Consultor 1',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: false,
  },
  {
    id: 7,

    hours: 2,
    description: 'Solucionar Problema...',
    customer: 'Cliente 7',
    ranking: 4,
    consultant: 'Consultor 2',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: false,
  },
  {
    id: 8,

    hours: 12,
    description: 'Solucionar Problema...',
    customer: 'Cliente 8',
    ranking: 4,
    consultant: 'Consultor 1',
    timestamp: new Date(Date.now()),
    status: 'Pendiente',
    cost: 15000,
    isPay: false,
  },
];
