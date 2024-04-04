import { FC, useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommentForm from "./CommentForm";

type Props = {
  comment: Comment;
};

const CommentCard: FC<Props> = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const displayName = comment.email.toLocaleLowerCase();

  const handleReply = (message: string) => {
    setReplies((prev) => [...prev, message]);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-start gap-2.5 mb-3 mr-6">
        <img
          className="w-8 h-8 rounded-full"
          src={`https://i.pravatar.cc/50??u=${displayName}`}
          alt={`Avatar from ${comment.name}`}
        />
        <div className="flex flex-col w-full max-w-[420px] leading-1.5 p-4 border-gray-200 bg-lime-200 rounded-xl dark:bg-gray-700">
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
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              Reply
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reply to {displayName}</DialogTitle>
              <DialogDescription>{comment.body}</DialogDescription>
            </DialogHeader>
            <CommentForm onReply={handleReply} />
          </DialogContent>
        </Dialog>
      </div>
      <div data-e2e-id="comment-reply" className="ml-20 mb-3">
        {replies.map((reply) => (
          <div className="bg-lime-100 p-3 rounded-lg max-w-80 mt-3">
            <b>Me: </b> <span>{reply}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentCard;
