import React from 'react';
import type { Meta } from '@storybook/react';
import { tokens } from '../../design-system/tokens';

export default {
  title: 'Design Tokens/Typography',
} as Meta;

export const Scale = () => (
  <div className="space-y-8 p-4">
    <h2 className="text-2xl font-bold border-b pb-2">Tipografia ({tokens.typography.fontFamily.sans})</h2>
    
    <div className="space-y-6">
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-xs (0.75rem)</div>
        <div className="text-xs">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-sm (0.875rem)</div>
        <div className="text-sm">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-base (1rem)</div>
        <div className="text-base">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-lg (1.125rem)</div>
        <div className="text-lg">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-xl (1.25rem)</div>
        <div className="text-xl">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-2xl (1.5rem)</div>
        <div className="text-2xl">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-3xl (1.875rem)</div>
        <div className="text-3xl">MudaFácil: A forma rápida de se mudar.</div>
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground mb-1">text-4xl (2.25rem)</div>
        <div className="text-4xl">MudaFácil: A forma rápida de se mudar.</div>
      </div>
    </div>
  </div>
);
