import React from 'react';
import type { Metadata } from 'next';
import HowItWorksContent from './HowItWorksContent';

export const metadata: Metadata = {
  title: 'How It Works | Pawloft Emergency Response',
  description: 'Learn how Pawloft connects people who spot injured animals with nearby verified responders and NGOs in real-time.',
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
