import React from 'react';

interface FormSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export default function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
        <Icon size={20} className="text-[#07906a]" />
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
}
