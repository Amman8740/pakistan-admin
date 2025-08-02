"use client";
import { ReactNode } from "react";
type OverviewCardProps = {
    title : string;
    value?: string | number;
    icon?: ReactNode;
    className?: string;
    onClick?: () => void
}
export default function OverViewCard ({title, value, icon, className = "bg-green-100", onClick}: OverviewCardProps) {
    return (
        <div 
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-xl shadow-sm ${className}`}>
            <div className="text-green-600">
                {icon}
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-700">{title}</h3>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );

}