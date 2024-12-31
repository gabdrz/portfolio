// src/types/cards.ts

export type Block = {
  type: 'title' | 'heading' | 'paragraph' | 'image' | 'gallery' | 'quote' | 'spacer';
  content: string;
  layout?: 'full' | 'wide' | 'contained';
  backgroundColor?: string;
  className?: string;
  projectData?: ProjectData;
};

export type Theme = {
  gradient?: {
    from: string;
    to: string;
  };
  backgroundColor?: string;
  textColor?: string;
};

export type ProjectData = {
  type: string;
  status: string;
  theme: Theme;
  content: Block[];
};

export type BaseCard = {
  id: number;
  type: 'links' | 'header' | 'content';
};

export type LinksCard = BaseCard & {
  type: 'links';
  layout: 'vertical' | 'horizontal';
  links: {
    email: string;
    github: string;
    linkedin: string;
    resume: string;
  };
};

export type HeaderCard = BaseCard & {
  type: 'header';
  title: string;
};

export type ContentCard = BaseCard & {
  type: 'content';
  image: string;
  title: string;
  subtitle: string;
};

export type ProjectCard = BaseCard & {
  type: 'content';
  image: string;
  title: string;
  subtitle: string;
  projectData: ProjectData;
  heroImage: string;
};


export type Card = LinksCard | HeaderCard | ContentCard | ProjectCard;