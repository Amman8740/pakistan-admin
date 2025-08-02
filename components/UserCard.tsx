"use client";
type UserCardProps = {
    name: string;
    phone: string;
    onBan?: () => void;
    isBanned?: boolean; 
}
export default function UserCard ({name, phone, onBan, isBanned = false}: UserCardProps) {
    return(
        <div className="flex w-full justify-between p-4 bg-gray-100 rounded shadow-sm">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500">{phone}</p>
        </div>
        <button
          onClick={onBan}
          className={`px-4 py-2 rounded text-white ${
            isBanned ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isBanned ? "Unban" : "Ban"}
        </button>
      </div>
    )
}