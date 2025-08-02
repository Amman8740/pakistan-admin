"use client";
import { CompanyFormData } from "@/types";
type Props = {
    data: CompanyFormData;
    onDelete: () => void;
}
export default function CompanyCard({ data, onDelete }: Props) {
  return (
    <div className="flex justify-between items-start bg-white rounded shadow-sm p-4">
      <div>
        <p className="font-bold text-black">{data.company}</p>
        <p className="text-sm text-gray-600">Director: {data.director}</p>
        <p className="text-sm text-gray-600">Phone: {data.phone}</p>
        <p className="text-sm text-gray-500 mt-1">{data.description}</p>
      </div>
      <div className="space-x-2">
        <button className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white">
          Edit
        </button>
        <button onClick={onDelete} className="text-sm px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-white">
          Delete
        </button>
      </div>
    </div>
  );
}
