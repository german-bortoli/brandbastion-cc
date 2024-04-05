import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { expect, describe, it } from "vitest";
import { Provider } from "react-redux";
import { store } from "@/store";
import AxiosMockAdapter from "axios-mock-adapter";

import { TooltipProvider } from "@/components/ui/tooltip";
import Posts from "./Posts";
import { api } from "@/services/apiService";
import { flushPromises } from "@/utils/testUtils";

const setupHTTPMocks = () => {
  const httpMock = new AxiosMockAdapter(api);
  httpMock.onGet("/users").reply(200, [
    { id: 1, name: "Jhon" },
    { id: 2, name: "Jane" },
  ]);

  httpMock.onGet("/posts").reply(200, [
    { id: 1, userId: 1, title: "Title 1", body: "First Body" },
    { id: 2, userId: 1, title: "Another Blog Post", body: "Second" },
  ]);
  return httpMock;
};
import { routeTree } from "@/routeTree.gen";
const router = createRouter({ routeTree });

const renderPostsList = () => {
  return render(
    <Provider store={store}>
      <TooltipProvider>
        <RouterProvider router={router}>
          <Posts />
        </RouterProvider>
      </TooltipProvider>
    </Provider>
  );
};
describe("Posts test", () => {
  it("Posts: should render Posts list", async () => {
    setupHTTPMocks();
    const { getByTestId } = renderPostsList();

    await flushPromises();

    const container = getByTestId("posts-list-content");
    expect(container).toBeTruthy();
  });

  it("Posts: should render error when api fails", async () => {
    const mockApi = setupHTTPMocks();
    mockApi.onGet("/posts").reply(400);

    const { getByTestId } = renderPostsList();
    await flushPromises();

    const container = getByTestId("posts-error-content");
    expect(container).toBeTruthy();
  });

  it("Posts: should filter by title when user types on search input", async () => {
    setupHTTPMocks();
    const { getByTestId } = renderPostsList();

    await flushPromises();

    const searchInput = getByTestId("search-input");
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: "Title 1" } });

    // Post should be present into the page
    const post1 = screen.queryByText("Title 1");
    expect(post1).toBeTruthy();

    // This post should not exists
    const post2 = screen.queryByText("Another Blog Post");
    expect(post2).toBeNull();
  });
});
