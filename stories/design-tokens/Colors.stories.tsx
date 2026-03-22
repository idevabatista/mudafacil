import React from 'react';
import type { Meta } from '@storybook/react';
import { tokens } from '../../design-system/tokens';

export default {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
} as Meta;

export const AllColors = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold border-b pb-2">Sistema de Cores</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Object.entries(tokens.colors).map(([key, value]) => (
        <div key={key} className="space-y-2 border rounded-md p-2 bg-card shadow-sm">
          <div 
            className="w-full h-24 rounded-sm border" 
            style={{ backgroundColor: value }} 
          />
          <div className="text-sm font-semibold">{key}</div>
          <div className="text-xs text-muted-foreground uppercase">{value}</div>
          <div className="text-xs text-muted-foreground bg-secondary/50 p-1 rounded font-mono">
            var(--{key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()})
          </div>
        </div>
      ))}
    </div>
  </div>
);
