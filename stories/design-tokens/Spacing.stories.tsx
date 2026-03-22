import React from 'react';
import type { Meta } from '@storybook/react';
import { tokens } from '../../design-system/tokens';

export default {
  title: 'Design Tokens/Spacing',
} as Meta;

export const Scale = () => (
  <div className="space-y-8 p-4">
    <h2 className="text-2xl font-bold border-b pb-2">Espaçamento</h2>
    
    <div className="space-y-4 max-w-xl">
      {Object.entries(tokens.spacing).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])).map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <div className="w-16 text-sm font-medium">space-{key}</div>
          <div className="w-24 text-xs text-muted-foreground">{value}</div>
          <div className="flex-1">
            <div 
              className="h-6 bg-primary/20 border border-primary/50" 
              style={{ width: value }} 
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
