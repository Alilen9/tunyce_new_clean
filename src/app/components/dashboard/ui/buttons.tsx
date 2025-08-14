'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';

// The interface was empty, causing a linting error.
// We've changed it to a type alias to fix the issue.
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center p-2 cursor-pointer rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';
