export interface Article {
  id: string;
  title: string;
  keyword: string;
  words: number;
  created: string;
  status: 'generated' | 'published' | 'scheduled' | 'archived';
}

export const articlesData: Article[] = [
  {
    id: '1',
    title: 'How to Improve Your Skills in League of Legends',
    keyword: 'league of legends [2240000]',
    words: 4575,
    created: '20 hours ago',
    status: 'generated',
  },
  {
    id: '2',
    title: 'How to Master Last Hitting in League of Legends',
    keyword: 'league of legends [2240000]',
    words: 3480,
    created: '21 hours ago',
    status: 'generated',
  },
  {
    id: '3',
    title: '7 Tips for Better Teamplay in League of Legends',
    keyword: 'league of legends [2240000]',
    words: 2676,
    created: 'a day ago',
    status: 'generated',
  },
  {
    id: '4',
    title: 'Top Virtual Executive Assistant Services (2024)',
    keyword: 'virtual executive assistant [2900]',
    words: 2408,
    created: '1 Oct, 24',
    status: 'generated',
  },
  {
    id: '5',
    title: 'Unlimited Graphics Design Solutions',
    keyword: 'unlimited graphic design services [390]',
    words: 1793,
    created: '---',
    status: 'generated',
  },
  {
    id: '6',
    title: 'Top Amazon Payment Methods for Quick Access to Funds',
    keyword: 'amazon payment methods [3600]',
    words: 2647,
    created: '---',
    status: 'published',
  },
  {
    id: '7',
    title: 'Backlinks 101: What are backlinks and why they\'re important [Free template]',
    keyword: 'backlinks [8100]',
    words: 2261,
    created: '---',
    status: 'scheduled',
  },
  {
    id: '8',
    title: '7 Leading AI SEO Tools in 2024 [Ranked & Compared]',
    keyword: 'ai seo software [880]',
    words: 1543,
    created: '---',
    status: 'archived',
  },
  {
    id: '9',
    title: 'Unlimited Graphic Design Services You Can Rely On',
    keyword: 'unlimited graphic design services [390]',
    words: 1974,
    created: '---',
    status: 'generated',
  }
];