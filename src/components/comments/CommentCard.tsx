import { FC, useState } from "react";
import CreatableSelect from "react-select/creatable";
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

type OptionType = { [key: string]: string };
type OptionsType = Array<OptionType>;

const CommentCard: FC<Props> = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replies, setReplies] = useState<string[]>([]);
  const [tags, setTags] = useState<OptionsType>([]);
  const displayName = comment.email.toLocaleLowerCase();

  const options = [
    { value: "tag1", label: "Tag1" },
    { value: "tag2", label: "Tag2" },
    { value: "tag3", label: "Tag3" },
  ];

  const handleReply = (message: string) => {
    setReplies((prev) => [...prev, message]);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="flex items-start gap-2.5 mb-3 mr-6"
        data-testid={`comment-card-${comment.id}`}
      >
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
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {comment.body}
          </p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <CreatableSelect
              value={tags}
              placeholder="Tags"
              onChange={(values) => {
                setTags(values as OptionsType);
              }}
              isMulti
              options={options}
            />
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="comment-more-actions">
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
      <div data-testid="comment-reply" className="ml-20 mb-3">
        {replies.map((reply, idx) => (
          <div
            key={idx}
            className="bg-lime-100 p-3 rounded-lg max-w-[375px] mt-3"
          >
            <b>Me: </b> <span>{reply}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentCard;
