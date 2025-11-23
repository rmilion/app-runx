// Constants for RUNX App

export const COLORS = {
  primary: '#00D9FF',
  secondary: '#9D4EDD',
  success: '#A0FF00',
  danger: '#FF0055',
  warning: '#FFA500',
  info: '#00B4D8',
  territories: {
    owned: '#00D9FF',
    contested: '#FFA500',
    enemy: '#FF0055',
    neutral: '#6B7280',
  },
};

export const GAME_MODES = {
  solo: {
    name: 'Modo Solo',
    description: 'Expanda seu império sem interferências',
    icon: 'User',
  },
  domination: {
    name: 'Modo Dominação',
    description: 'Conquiste territórios de outros jogadores',
    icon: 'Swords',
  },
  team: {
    name: 'Modo Time',
    description: 'Dispute bairros em equipe',
    icon: 'Users',
  },
  stealth: {
    name: 'Modo Stealth',
    description: 'Corra sem revelar sua posição',
    icon: 'Eye',
  },
};

export const XP_LEVELS = [
  { level: 1, xpRequired: 0, title: 'Novato' },
  { level: 2, xpRequired: 100, title: 'Corredor' },
  { level: 3, xpRequired: 250, title: 'Explorador' },
  { level: 4, xpRequired: 500, title: 'Conquistador' },
  { level: 5, xpRequired: 1000, title: 'Dominador' },
  { level: 6, xpRequired: 2000, title: 'Imperador' },
  { level: 7, xpRequired: 4000, title: 'Lenda' },
  { level: 8, xpRequired: 8000, title: 'Mito' },
  { level: 9, xpRequired: 15000, title: 'Deus da Corrida' },
  { level: 10, xpRequired: 30000, title: 'Imortal' },
];

export const MISSION_TEMPLATES = [
  {
    type: 'distance',
    title: 'Maratona Diária',
    description: 'Corra 2 km para reforçar seus territórios',
    target: 2000,
    reward: { xp: 50, energy: 10 },
  },
  {
    type: 'conquest',
    title: 'Expansão',
    description: 'Conquiste 1 novo quarteirão',
    target: 1,
    reward: { xp: 75, energy: 15 },
  },
  {
    type: 'defense',
    title: 'Defesa Ativa',
    description: 'Defenda uma área antes que ela caia',
    target: 1,
    reward: { xp: 100, energy: 20 },
  },
  {
    type: 'time',
    title: 'Resistência',
    description: 'Corra por 30 minutos sem parar',
    target: 1800,
    reward: { xp: 80, energy: 15 },
  },
];

export const ANTI_CHEAT = {
  maxSpeed: 25, // km/h - acima disso é considerado veículo
  minSpeed: 3, // km/h - abaixo disso não conta
  maxGpsJump: 100, // metros - saltos maiores são desconsiderados
  minAccuracy: 50, // metros - precisão mínima do GPS
  accelerometerThreshold: 0.5, // m/s² - movimento mínimo detectado
};

export const ENERGY_CONFIG = {
  maxEnergy: 100,
  regenRate: 1, // por minuto
  costPerKm: 5,
  boostCost: 20,
};

export const TERRITORY_CONFIG = {
  minArea: 100, // m²
  strengthPerRun: 10,
  decayRate: 1, // por dia sem reforço
  contestThreshold: 50, // força mínima para contestar
};
