interface AdContainerProps {
  children: React.ReactNode;
  position?: 'top' | 'middle' | 'bottom';
  className?: string;
}

export function AdContainer({ children, position = 'middle', className = '' }: AdContainerProps) {
  const positionClass = {
    top: 'mt-4 mb-8',
    middle: 'my-8',
    bottom: 'mt-8 mb-4',
  }[position];

  return (
    <div className={`flex justify-center ${positionClass} ${className}`}>
      <div className="w-full max-w-4xl px-4">
        {children}
      </div>
    </div>
  );
}
