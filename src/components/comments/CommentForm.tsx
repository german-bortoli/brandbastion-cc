import React, { FC, createRef } from "react";
import { CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onReply: (message: string) => void;
}

const CommentForm: FC<Props> = ({ onReply }) => {
  const formRef = createRef<HTMLFormElement>();
  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    onReply(form.reply.value);
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Label htmlFor="reply" className="sr-only">
        Reply
      </Label>
      <Textarea
        id="reply"
        name="reply"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Reply
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
