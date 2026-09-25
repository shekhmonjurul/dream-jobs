import React, { useId } from 'react';

interface FormFieldProps {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function FormField({ label, icon: Icon, children, className = "", id }: FormFieldProps) {
  // Auto-generate an ID to link label with input for accessibility and valid hydration
  const generatedId = useId();
  const fieldId = id || generatedId;
  
  // Clone the child element to inject the id if it doesn't already have one
  let element = children;
  if (React.isValidElement<{ id?: string }>(children)) {
      const child = children;
      element = React.cloneElement(child, { id: child.props.id || fieldId });
  }

  return (
    <div className={`flex flex-col gap-1.5 text-black ${className}`}>
      <label htmlFor={fieldId} className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-0.5 whitespace-nowrap">
        {Icon && <Icon size={16} className="text-[#07906a]" />}
        {label}
      </label>
      {element}
    </div>
  );
}
