// components/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
    title: string;
    value: number | string;
    color: string;
    icon: React.ReactNode;
    lastUpdated: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, icon, lastUpdated }) => {
    return (
        <div className="rounded-xl p-4 shadow-md flex items-center gap-4" style={{ backgroundColor: color }}>
            <div className="text-4xl">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-gray-600">Last updated: {lastUpdated}</p>
            </div>
        </div>
    );
};

export default StatsCard;
