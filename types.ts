export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PortfolioItem {
  img: string;
  title: string;
  desc: string;
  moreInfo: string;
  tags?: string[];
}

export interface CaseStudy {
  client: string;
  title: string;
  description: string;
  metric: string;
  imageBefore: string;
  imageAfter: string;
  tags: string[];
}

export enum ChatState {
  IDLE,
  THINKING,
  RESPONDING,
  ERROR,
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
