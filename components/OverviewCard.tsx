"use client";
import { ReactNode } from "react";
type OverviewCardProps = {
    title : string;
    value?: string | number;
    icon?: ReactNode;
    className?: string;
    onClick?: () => void;
    verticalOnMobile?: boolean;
}
export default function OverViewCard ({title, value, icon, className = "bg-green-100", onClick, verticalOnMobile = false}: OverviewCardProps) {
    return (
 <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={`flex ${
        verticalOnMobile ? "flex-col items-center text-center" : "items-center gap-4"
      } gap-2 p-4 rounded-xl shadow-sm ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="text-green-600">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {value !== undefined && (
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
    </div>
    );

}