import { FC } from "react";
import { MoreVertical } from "lucide-react";

import { Comment } from "@/types/app";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  comment: Comment;
};

const CommentCard: FC<Props> = ({ comment }) => {
  const displayName = comment.email.toLocaleLowerCase();

  return (
    <div className="flex items-start gap-2.5 mb-3">
      <img
        className="w-8 h-8 rounded-full"
        src={`https://i.pravatar.cc/50??u=${displayName}`}
        alt={`Avatar from ${comment.name}`}
      />
      <div className="flex flex-col w-full max-w-[420px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {displayName}
          </span>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            TIME?
          </span> */}
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {comment.body}
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          TAGS
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Reply</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentCard;
