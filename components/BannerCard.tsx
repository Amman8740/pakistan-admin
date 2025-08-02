import { Pencil, Trash } from "lucide-react";
type BannerCardProps = {
    banner: {
      title: string;
      image?: string;
    };
    onEdit: () => void;
    onDelete: () => void;
  };
export default function BannerCard ({banner, onEdit, onDelete}: BannerCardProps) {
    return (
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg">
            <div className="flex items-center gap-4">
                <img src={banner.image || '/placeholder.png'} alt={banner.title} className="w-12 h-12 object-cover rounded-md"/>
                <span className="font-medium">{banner.title}</span>
            </div>
            <div className="flex gap-2">
                <button onClick={onEdit}>
                    <Pencil size={18} className="text-green-500 hover:text-green-700"/>
                </button>
                <button onClick={onDelete}>
                    <Trash size={18} className="text-red-500  hover:text-red-700"/>
                </button>
            </div>
        </div>
    );
}