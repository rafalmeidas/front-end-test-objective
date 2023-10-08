/* eslint-disable testing-library/no-unnecessary-act */
import {
  fireEvent,
  waitFor,
  render,
  screen,
  act,
} from "@testing-library/react";
import Router from "react-router-dom";

import PaginatorContextProvider from "../../../contexts/paginator-context";
import Home from "../../../pages/home/home";

import { Character } from "../../../types/marvels";
import * as fetch from "../../../utils/api";

const Wrapper = () => (
  <PaginatorContextProvider>
    <Home />
  </PaginatorContextProvider>
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const generateCharacter = (id: number, name: string): Character => ({
  id,
  name,
  description: "description...",
  thumbnail: {
    path: "img",
    extension: "jpg",
  },
  series: {
    available: 1,
    collectionURI: "",
    items: [
      {
        resourceURI: "/v1/public/series/1",
        name: "Série 1",
      },
    ],
    returned: 1,
  },
  comics: {
    available: 1,
    collectionURI: "",
    items: [
      {
        resourceURI: "/v1/public/comics/1",
        name: "Comic 1",
      },
    ],
    returned: 1,
  },
  events: {
    available: 1,
    collectionURI: "",
    items: [
      {
        resourceURI: "/v1/public/events/1",
        name: "Event 1",
      },
    ],
    returned: 1,
  },
});

const CHARACTERS_PAGE_1: Character[] = [
  { id: 1, name: "Spider-Man (Marvel Zombies)" },
  { id: 2, name: "Aeron Stack" },
  { id: 3, name: "Iron Man" },
  { id: 4, name: "Abomination" },
  { id: 5, name: "Abyss" },
  { id: 6, name: "Adam Destine" },
  { id: 7, name: "Adam Warlock" },
  { id: 8, name: "Wolverine" },
  { id: 9, name: "Wonder Man" },
  { id: 10, name: "Wasp" },
].map(({ id, name }) => generateCharacter(id, name));

const CHARACTERS_PAGE_2: Character[] = [
  { id: 11, name: "Balder" },
  { id: 12, name: "Avengers" },
  { id: 13, name: "Baron Strucker" },
  { id: 14, name: "Beak" },
  { id: 15, name: "Bean Parker" },
  { id: 16, name: "Black Tom" },
  { id: 17, name: "Black Widow" },
  { id: 18, name: "Cable" },
  { id: 19, name: "Bug" },
  { id: 20, name: "Calypso" },
].map(({ id, name }) => generateCharacter(id, name));

const CHARACTERS_PAGE_3: Character[] = [
  { id: 21, name: "Captain America" },
  { id: 22, name: "Captain Universe" },
].map(({ id, name }) => generateCharacter(id, name));

describe("<Home />", () => {
  const navigate = jest.fn();
  let page = 1;
  let search = "";

  beforeEach(() => {
    page = 1;
    search = "";

    jest.spyOn(fetch, "getCharacteres").mockImplementation(() => {
      const allCharacters = [
        ...CHARACTERS_PAGE_1,
        ...CHARACTERS_PAGE_2,
        ...CHARACTERS_PAGE_3,
      ];
      let total = allCharacters.length;
      let results: Character[] = [];

      switch (page) {
        case 1:
          results = CHARACTERS_PAGE_1;
          break;
        case 2:
          results = CHARACTERS_PAGE_2;
          break;
        default:
          results = CHARACTERS_PAGE_3;
          break;
      }

      if (search) {
        results = allCharacters.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        );
        total = results.length;
      }

      return Promise.resolve({
        total,
        results,
      });
    });

    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const toBeInTheDocument = (name: string) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  };

  const notToBeInTheDocument = (name: string) => {
    expect(screen.queryByText(name)).not.toBeInTheDocument();
  };

  const toBeInTheDocumentCharactersPageOne = (isToBeIn: boolean) => {
    const expectTo = isToBeIn ? toBeInTheDocument : notToBeInTheDocument;

    expectTo("Spider-Man (Marvel Zombies)");
    expectTo("Aeron Stack");
    expectTo("Iron Man");
    expectTo("Abomination");
    expectTo("Abyss");
    expectTo("Adam Destine");
    expectTo("Adam Warlock");
    expectTo("Wolverine");
    expectTo("Wonder Man");
    expectTo("Wasp");
  };

  const toBeInTheDocumentCharactersPageTwo = (isToBeIn: boolean) => {
    const expectTo = isToBeIn ? toBeInTheDocument : notToBeInTheDocument;

    expectTo("Balder");
    expectTo("Avengers");
    expectTo("Baron Strucker");
    expectTo("Beak");
    expectTo("Bean Parker");
    expectTo("Black Tom");
    expectTo("Black Widow");
    expectTo("Cable");
    expectTo("Bug");
    expectTo("Calypso");
  };

  const toBeInTheDocumentCharactersPageThree = (isToBeIn: boolean) => {
    const expectTo = isToBeIn ? toBeInTheDocument : notToBeInTheDocument;

    expectTo("Captain America");
    expectTo("Captain Universe");
  };

  const getInputSearch = () => screen.getByPlaceholderText("Search");

  const getButton = (name: string) => screen.getByRole("button", { name });

  const getButtonPage = (pageNumber: number) =>
    getButton(`mudar para a página ${pageNumber}`);
  const getButtonBackFirstPage = () =>
    getButton("voltar para a primeira página");
  const getButtonNextLastPage = () => getButton("avançar para a última página");
  const getButtonBackOnePage = () => getButton("voltar uma página");
  const getButtonNextOnePage = () => getButton("avançar uma página");

  it("should render Home component correctly", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    expect(
      screen.getByRole("heading", { name: "Busca de personagens" })
    ).toBeInTheDocument();

    expect(getInputSearch()).toBeInTheDocument();

    expect(screen.getByText("Personagem")).toBeInTheDocument();
    expect(screen.getByText("Séries")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);
  });

  it("should search for a character by name", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    search = "Captain America";
    expect(search).toEqual("Captain America");

    await act(async () => {
      fireEvent.change(getInputSearch(), { target: { value: search } });
    });

    await waitFor(() => {
      toBeInTheDocument(search);
    });
  });

  it("should render Home component correctly. When click the button next page", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonNextOnePage());
    });

    toBeInTheDocumentCharactersPageOne(false);
    toBeInTheDocumentCharactersPageTwo(true);
    toBeInTheDocumentCharactersPageThree(false);
  });

  it("should render Home component correctly. When click the button back page", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonNextOnePage());
    });

    toBeInTheDocumentCharactersPageOne(false);
    toBeInTheDocumentCharactersPageTwo(true);
    toBeInTheDocumentCharactersPageThree(false);

    page = 1;
    expect(page).toBe(1);

    await act(async () => {
      fireEvent.click(getButtonBackOnePage());
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);
  });

  it("should render Home component correctly. When click the page number button", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    page = 3;
    expect(page).toBe(3);

    await act(async () => {
      fireEvent.click(getButtonPage(page));
    });

    toBeInTheDocumentCharactersPageOne(false);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(true);
  });

  it("should render Home component correctly. When click the button last page", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    page = 3;
    expect(page).toBe(3);

    await act(async () => {
      fireEvent.click(getButtonNextLastPage());
    });

    toBeInTheDocumentCharactersPageOne(false);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(true);
  });

  it("should render Home component correctly. When click the button first page", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);

    page = 3;
    expect(page).toBe(3);

    await act(async () => {
      fireEvent.click(getButtonNextLastPage());
    });

    toBeInTheDocumentCharactersPageOne(false);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(true);

    page = 1;
    expect(page).toBe(1);

    await act(async () => {
      fireEvent.click(getButtonBackFirstPage());
    });

    toBeInTheDocumentCharactersPageOne(true);
    toBeInTheDocumentCharactersPageTwo(false);
    toBeInTheDocumentCharactersPageThree(false);
  });

  it("should navigate to a character's details page. When clicking on a card", async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    toBeInTheDocumentCharactersPageOne(true);

    await act(async () => {
      fireEvent.click(screen.getByText("Iron Man"));
    });

    expect(navigate).toHaveBeenCalledWith("/character/3");
  });
});
