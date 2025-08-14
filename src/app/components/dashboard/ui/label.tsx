'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';

// The interface was empty, causing a linting error.
// We've changed it to a type alias to fix the issue.
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium text-gray-700', className)}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };
