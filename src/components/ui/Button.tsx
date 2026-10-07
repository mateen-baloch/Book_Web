import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-on-primary hover:-translate-y-[1px] hover:shadow-[0_2px_4px_rgba(30,27,75,0.03),0_8px_16px_rgba(30,27,75,0.05)]',
      secondary: 'bg-transparent border-[1.5px] border-primary text-primary hover:bg-primary/5',
      tertiary: 'bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-md',
      lg: 'px-6 py-3 text-lg font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-secondary/50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
