import { render } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Provider } from "react-redux";
import { store } from "@/store";
import AxiosMockAdapter from "axios-mock-adapter";

import { TooltipProvider } from "@/components/ui/tooltip";
import Comments from "./Comments";
import { api } from "@/services/apiService";
import { flushPromises } from "@/utils/testUtils";

const setupHTTPMocks = () => {
  const httpMock = new AxiosMockAdapter(api);
  httpMock
    .onGet("/posts/1/comments")
    .reply(200, [{ id: 1, postId: 2, body: "Comment", email: "jhon@doe.com" }]);
  return httpMock;
};

const renderCommentsList = (props) =>
  render(
    <Provider store={store}>
      <TooltipProvider>
        <Comments postId={1} {...props} />
      </TooltipProvider>
    </Provider>
  );

describe("Comment test", () => {
  it("should render Comments list", async () => {
    setupHTTPMocks();
    const { getByTestId } = renderCommentsList({});

    await flushPromises();

    const commentComponent = getByTestId("comments-container");
    expect(commentComponent).toBeTruthy();

    // Expects to have a comment loaded from the api
    const commentBox = getByTestId("comment-card-1");
    expect(commentBox).toBeTruthy();
  });
});
