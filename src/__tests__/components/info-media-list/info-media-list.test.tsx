/* eslint-disable testing-library/no-unnecessary-act */
import {
  fireEvent,
  waitFor,
  render,
  screen,
  act,
} from "@testing-library/react";

import InfoMediaList, {
  InfoMediaListProps,
} from "../../../components/info-media-list/info-media-list";
import PaginatorContextProvider from "../../../contexts/paginator-context";

import { Media } from "../../../types/marvels";
import * as fetch from "../../../utils/api";

const MEDIA_MOCK_1: Media = {
  id: 1,
  title: "Chaos War",
  thumbnail: {
    path: "image",
    extension: "jpg",
  },
};

const MEDIA_MOCK_2: Media = {
  id: 2,
  title: "Earth X (1999 - 2000)",
  thumbnail: {
    path: "image",
    extension: "jpg",
  },
};

const Wrapper = (props: InfoMediaListProps) => (
  <PaginatorContextProvider
    itemsPerPage={props.itemsPerPage ?? 5}
    totalResults={5}
    allPages={[1, 2, 3, 4, 5]}
  >
    <InfoMediaList {...props} />
  </PaginatorContextProvider>
);

describe("<InfoMediaList />", () => {
  beforeEach(() => {
    jest
      .spyOn(fetch, "getMedia")
      .mockReturnValue(
        Promise.resolve({ total: 1, results: [MEDIA_MOCK_1, MEDIA_MOCK_2] })
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the component with a title", async () => {
    await act(async () => {
      render(<Wrapper id={1} title="Test Title" mediaType="series" />);
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render a loader when isLoading is true", async () => {
    render(<Wrapper id={1} title="Test Title" mediaType="series" />);

    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Chaos War")).toBeInTheDocument();
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render media cards when media is available", async () => {
    await act(async () => {
      render(<Wrapper id={1} title="Test Title" mediaType="series" />);
    });

    expect(screen.getByText("Chaos War")).toBeInTheDocument();
    expect(screen.getByText("Earth X (1999 - 2000)")).toBeInTheDocument();
  });

  it("should change page when paginator is clicked", async () => {
    let page = 1;

    jest
      .spyOn(fetch, "getMedia")
      .mockImplementation(() =>
        page === 1
          ? Promise.resolve({ total: 2, results: [MEDIA_MOCK_1] })
          : Promise.resolve({ total: 2, results: [MEDIA_MOCK_2] })
      );

    await act(async () => {
      render(
        <Wrapper
          id={1}
          title="Test Title"
          mediaType="series"
          itemsPerPage={1}
        />
      );
    });

    expect(screen.getByText("Chaos War")).toBeInTheDocument();
    expect(screen.queryByText("Earth X (1999 - 2000)")).not.toBeInTheDocument();

    const paginatorButton = screen.getByRole("button", {
      name: "mudar para a página 2",
    });

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(paginatorButton);
    });

    await waitFor(() => {
      expect(paginatorButton).toHaveClass("selected");
    });

    expect(screen.getByText("Earth X (1999 - 2000)")).toBeInTheDocument();
  });

  it("should display a standard empty media message when receiving an empty array", async () => {
    jest
      .spyOn(fetch, "getMedia")
      .mockImplementation(() => Promise.resolve({ total: 2, results: [] }));

    await act(async () => {
      render(
        <Wrapper
          id={1}
          title="Test Title"
          mediaType="series"
          itemsPerPage={1}
        />
      );
    });

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nenhuma mídia disponível."
    );
  });

  it("should display a custom empty media message, when receiving an empty array", async () => {
    jest
      .spyOn(fetch, "getMedia")
      .mockImplementation(() => Promise.resolve({ total: 2, results: [] }));

    await act(async () => {
      render(
        <Wrapper
          id={1}
          title="Test Title"
          mediaType="series"
          itemsPerPage={1}
          emptyMessage="Sem mídias."
        />
      );
    });

    expect(screen.getByRole("alert")).toHaveTextContent("Sem mídias.");
  });
});
