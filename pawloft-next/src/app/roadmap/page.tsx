import React from 'react';
import type { Metadata } from 'next';
import RoadmapContent from './RoadmapContent';

export const metadata: Metadata = {
  title: 'Vision & Roadmap | Pawloft',
  description: 'Our execution roadmap to build India\'s first dedicated emergency infrastructure for animals.',
};

export default function RoadmapPage() {
  return <RoadmapContent />;
}
