"use client"

import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Plus, Image as ImageIcon, Video as VideoIcon, Code as CodeIcon, Type } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Button } from "@/components/ui/button"
import 'katex/dist/katex.min.css';

interface ContentSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'formula' | 'code';
  content: string;
  language?: string;
  caption?: string;
}

interface Section {
  id: string;
  title: string;
  level: number;
  content: ContentSection[];
  children: Section[];
}

interface TechnicalContentProps {
  initialSections?: Section[];
}

export default function TechnicalContent({ initialSections = [] }: TechnicalContentProps) {
  const [sections, setSections] = useState<Section[]>(initialSections);

  const addSection = (parentId: string | null) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Section',
      level: 1,
      content: [],
      children: [],
    };

    if (!parentId) {
      setSections([...sections, newSection]);
      return;
    }

    const updateSections = (sections: Section[]): Section[] => {
      return sections.map(section => {
        if (section.id === parentId) {
          return {
            ...section,
            children: [...section.children, newSection],
          };
        }
        if (section.children.length > 0) {
          return {
            ...section,
            children: updateSections(section.children),
          };
        }
        return section;
      });
    };

    setSections(updateSections(sections));
  };

  const deleteSection = (sectionId: string) => {
    const deleteSectionFromArray = (sections: Section[]): Section[] => {
      return sections.filter(section => {
        if (section.id === sectionId) {
          return false;
        }
        if (section.children.length > 0) {
          section.children = deleteSectionFromArray(section.children);
        }
        return true;
      });
    };

    setSections(deleteSectionFromArray(sections));
  };

  const addContent = (sectionId: string, type: ContentSection['type']) => {
    const newContent: ContentSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
    };

    const updateSections = (sections: Section[]): Section[] => {
      return sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: [...section.content, newContent],
          };
        }
        if (section.children.length > 0) {
          return {
            ...section,
            children: updateSections(section.children),
          };
        }
        return section;
      });
    };

    setSections(updateSections(sections));
  };

  const deleteContent = (sectionId: string, contentId: string) => {
    const updateSections = (sections: Section[]): Section[] => {
      return sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.filter(c => c.id !== contentId),
          };
        }
        if (section.children.length > 0) {
          return {
            ...section,
            children: updateSections(section.children),
          };
        }
        return section;
      });
    };

    setSections(updateSections(sections));
  };

  const updateContent = (sectionId: string, contentId: string, newContent: string) => {
    const updateSections = (sections: Section[]): Section[] => {
      return sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.map(c => 
              c.id === contentId ? { ...c, content: newContent } : c
            ),
          };
        }
        if (section.children.length > 0) {
          return {
            ...section,
            children: updateSections(section.children),
          };
        }
        return section;
      });
    };

    setSections(updateSections(sections));
  };

  const renderContentSection = (section: Section, content: ContentSection) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            <textarea
              className="w-full p-2 border rounded"
              value={content.content}
              onChange={(e) => updateContent(section.id, content.id, e.target.value)}
            />
          </div>
        );
      case 'image':
        return (
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Image URL"
              value={content.content}
              onChange={(e) => updateContent(section.id, content.id, e.target.value)}
            />
            {content.content && (
              <img src={content.content} alt={content.caption || ''} className="max-w-full h-auto" />
            )}
          </div>
        );
      case 'video':
        return (
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Video URL"
              value={content.content}
              onChange={(e) => updateContent(section.id, content.id, e.target.value)}
            />
            {content.content && (
              <video src={content.content} controls className="max-w-full" />
            )}
          </div>
        );
      case 'formula':
        return (
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="LaTeX formula"
              value={content.content}
              onChange={(e) => updateContent(section.id, content.id, e.target.value)}
            />
            <div className="p-2 bg-gray-50 rounded">
              <BlockMath>{content.content}</BlockMath>
            </div>
          </div>
        );
      case 'code':
        return (
          <div>
            <textarea
              className="w-full p-2 border rounded mb-2 font-mono"
              value={content.content}
              onChange={(e) => updateContent(section.id, content.id, e.target.value)}
            />
            <div className="p-2 bg-gray-50 rounded">
              <SyntaxHighlighter language={content.language || 'javascript'}>
                {content.content}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            className="text-xl font-bold bg-transparent border-none focus:outline-none"
            value={section.title}
            onChange={(e) => {
              const updateSections = (sections: Section[]): Section[] => {
                return sections.map(s => {
                  if (s.id === section.id) {
                    return { ...s, title: e.target.value };
                  }
                  if (s.children.length > 0) {
                    return { ...s, children: updateSections(s.children) };
                  }
                  return s;
                });
              };
              setSections(updateSections(sections));
            }}
          />
          <div className="flex items-center gap-2">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="min-w-[160px] bg-white rounded-md shadow-lg p-1">
                <DropdownMenu.Item
                  className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => addContent(section.id, 'text')}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Text
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => addContent(section.id, 'image')}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => addContent(section.id, 'video')}
                >
                  <VideoIcon className="h-4 w-4 mr-2" />
                  Video
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => addContent(section.id, 'code')}
                >
                  <CodeIcon className="h-4 w-4 mr-2" />
                  Code
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => deleteSection(section.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        {section.content.map((content, index) => (
          <div key={content.id} className="mb-4">
            {renderContentSection(section, content)}
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 text-red-600 hover:text-red-700"
              onClick={() => deleteContent(section.id, content.id)}
            >
              Delete
            </Button>
          </div>
        ))}
        {section.children.map(child => renderSection(child))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => addSection(null)}
        >
          Add Section
        </Button>
      </div>
      {sections.map(section => renderSection(section))}
      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No sections yet.</p>
          <p className="text-sm">Click "Add Section" to get started.</p>
        </div>
      )}
    </div>
  );
}
