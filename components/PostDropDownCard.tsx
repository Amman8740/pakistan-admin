import React, { useState } from "react";
import { FaSolarPanel, FaCarBattery, FaPlug } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Rss } from "lucide-react";
import { useRouter } from "next/navigation";
type PostsDropdownCardProps = {
  onClick?: () => void;
};
const PostsDropdownCard = ({ onClick }: PostsDropdownCardProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow transition-all">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between text-sm gap-2 text-gray-700">
          <Rss size={25} className="text-green-500" />
          Posts
        </div>
        {isOpen ? (
          <HiChevronUp className="text-green-500 text-xl" />
        ) : (
          <HiChevronDown className="text-green-500 text-xl" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 space-y-3 pl-7">
          <div
            onClick={() => {
              router.push("/posts/panels");
              onClick?.();
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
          >
            <FaSolarPanel className="text-green-400" />
            Panels Post
          </div>
          <div
            onClick={() => {
              router.push("/posts/batteries");
              onClick?.();
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
          >
            <FaCarBattery className="text-green-400" />
            Batteries Post
          </div>
          <div
            onClick={() => {
              router.push("/posts/inverters");
              onClick?.();
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer"
          >
            <FaPlug className="text-green-400" />
            Inverters Post
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsDropdownCard;
