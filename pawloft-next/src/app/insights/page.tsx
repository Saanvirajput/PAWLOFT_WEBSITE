import React from 'react';
import type { Metadata } from 'next';
import InsightsContent from './InsightsContent';

export const metadata: Metadata = {
  title: 'Insights & Research | Pawloft',
  description: 'Voices from the field. Learn how Pawloft uses ground realities and expert conversations to build rescue infrastructure.',
};

export default function InsightsPage() {
  return <InsightsContent />;
}
