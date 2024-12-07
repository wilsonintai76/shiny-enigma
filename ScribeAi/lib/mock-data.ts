export const mockBooks = [
  {
    id: '1',
    title: 'The Art of AI Writing',
    description: 'A comprehensive guide to writing with artificial intelligence',
    coverImage: '/images/book-covers/ai-writing.jpg',
    chapters: [
      {
        id: 'ch1',
        title: 'Introduction to AI Writing',
        content: 'AI writing is revolutionizing how we create content...',
        wordCount: 1500,
        lastEdited: new Date('2024-01-05').toISOString(),
      },
      {
        id: 'ch2',
        title: 'Getting Started',
        content: 'In this chapter, we'll explore the basics...',
        wordCount: 2000,
        lastEdited: new Date('2024-01-06').toISOString(),
      },
    ],
    status: 'in-progress',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-06').toISOString(),
  },
  {
    id: '2',
    title: 'Digital Marketing Essentials',
    description: 'Learn the fundamentals of digital marketing',
    coverImage: '/images/book-covers/marketing.jpg',
    chapters: [
      {
        id: 'ch1',
        title: 'Understanding Digital Marketing',
        content: 'Digital marketing encompasses all marketing efforts...',
        wordCount: 1800,
        lastEdited: new Date('2024-01-04').toISOString(),
      },
    ],
    status: 'draft',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-04').toISOString(),
  },
];

export const mockTemplates = [
  {
    id: '1',
    title: 'Business Book Template',
    description: 'Perfect for business and entrepreneurship books',
    chapters: [
      'Introduction',
      'Market Analysis',
      'Business Strategy',
      'Implementation',
      'Case Studies',
      'Conclusion',
    ],
    category: 'Business',
    popularity: 4.8,
  },
  {
    id: '2',
    title: 'Fiction Novel Template',
    description: 'Ideal for fiction writers and storytellers',
    chapters: [
      'Prologue',
      'Character Introduction',
      'Rising Action',
      'Climax',
      'Resolution',
      'Epilogue',
    ],
    category: 'Fiction',
    popularity: 4.6,
  },
];

export const mockWritingHistory = [
  {
    id: '1',
    bookId: '1',
    chapterId: 'ch1',
    wordCount: 500,
    timeSpent: 30, // minutes
    date: new Date('2024-01-05').toISOString(),
    aiSuggestionsUsed: 5,
  },
  {
    id: '2',
    bookId: '1',
    chapterId: 'ch2',
    wordCount: 750,
    timeSpent: 45,
    date: new Date('2024-01-06').toISOString(),
    aiSuggestionsUsed: 8,
  },
];

export const mockUserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/images/avatars/default.jpg',
  writingStats: {
    totalBooks: 2,
    totalWords: 5300,
    totalTimeSpent: 75, // minutes
    averageWordsPerSession: 625,
  },
  preferences: {
    theme: 'light',
    fontSize: 16,
    autoSave: true,
    aiSuggestions: true,
  },
};

export const mockNotifications = [
  {
    id: '1',
    type: 'success',
    message: 'Chapter successfully saved',
    timestamp: new Date('2024-01-06T10:30:00').toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'info',
    message: 'New AI writing features available',
    timestamp: new Date('2024-01-05T15:45:00').toISOString(),
    read: true,
  },
];
