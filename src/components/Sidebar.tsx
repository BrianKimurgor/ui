// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-200 w-64 p-4 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">Sidebar</h2>
      <ul className='space-y-4'>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/badges">Badges</Link></li>
        <li><Link href="/dashboard/projects">Projects</Link></li>
        <li><Link href="/dashboard/skills">Skills</Link></li>
        <li><Link href="/dashboard/experience">Experience</Link></li>
        <li><Link href="/dashboard/education">Education</Link></li>
        <li><Link href="/dashboard/social">Social Links</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
