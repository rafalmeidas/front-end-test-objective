/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen, act } from "@testing-library/react";
import Router from "react-router-dom";

import Character from "../../../pages/character/character";

import {
  Character as CharacterType,
  Thumbnail,
  Media,
} from "../../../types/marvels";
import * as fetch from "../../../utils/api";

const generateCharacter = (
  description: string = "description..."
): CharacterType => ({
  id: 1,
  name: "Spider-Man",
  description,
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

const generateMedia = (
  id: number,
  title: string,
  thumbnail: Thumbnail | null = {
    path: "image",
    extension: "jpg",
  }
): Media => ({
  id,
  title,
  thumbnail,
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("<Character />", () => {
  const navigate = jest.fn();
  let page = 1;
  let mediaTotal = 7;

  beforeEach(() => {
    page = 1;

    jest.spyOn(fetch, "getCharacter").mockImplementation(() =>
      Promise.resolve({
        total: 1,
        results: [generateCharacter()],
      })
    );

    jest.spyOn(fetch, "getMedia").mockImplementation((url) => {
      const results: Media[] = [];

      for (let index = 0; index < mediaTotal; index++) {
        const id = index + 1;
        results.push(generateMedia(id, `${url} ${id}`));
      }

      return Promise.resolve({
        total: results.length,
        results: results.splice(
          page === 1 ? 0 : 6,
          page === 1 ? 6 : mediaTotal
        ),
      });
    });

    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
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

  const toBeInTheDocumentMediaPageOne = (
    media: fetch.MediaType,
    isToBeIn: boolean
  ) => {
    const expectTo = isToBeIn ? toBeInTheDocument : notToBeInTheDocument;

    expectTo(`${media} 1`);
    expectTo(`${media} 2`);
    expectTo(`${media} 3`);
    expectTo(`${media} 4`);
    expectTo(`${media} 5`);
    expectTo(`${media} 6`);
  };

  const toBeInTheDocumentMediaPageTwo = (
    media: fetch.MediaType,
    isToBeIn: boolean
  ) => {
    const expectTo = isToBeIn ? toBeInTheDocument : notToBeInTheDocument;

    expectTo(`${media} 7`);
  };

  const getButton = (name: string, position: number) =>
    screen.getAllByRole("button", { name })[position];

  const getButtonPage = (pageNumber: number, position: number) =>
    getButton(`mudar para a página ${pageNumber}`, position);

  it("should render Character component correctly", async () => {
    await act(async () => {
      render(<Character />);
    });

    expect(screen.getByRole("button", { name: "voltar" })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Detalhes do Personagem" })
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Spider-Man" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Spider-Man" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Histórias em quadrinhos" })
    ).toBeInTheDocument();
    toBeInTheDocumentMediaPageOne("comics", true);
    toBeInTheDocumentMediaPageTwo("comics", false);

    expect(screen.getByRole("heading", { name: "Series" })).toBeInTheDocument();
    toBeInTheDocumentMediaPageOne("series", true);
    toBeInTheDocumentMediaPageTwo("series", false);

    expect(
      screen.getByRole("heading", { name: "Histórias" })
    ).toBeInTheDocument();
    toBeInTheDocumentMediaPageOne("stories", true);
    toBeInTheDocumentMediaPageTwo("stories", false);

    expect(
      screen.getByRole("heading", { name: "Eventos" })
    ).toBeInTheDocument();
    toBeInTheDocumentMediaPageOne("events", true);
    toBeInTheDocumentMediaPageTwo("events", false);
  });

  it("should render the media lists empty", async () => {
    jest.spyOn(fetch, "getMedia").mockImplementation(() =>
      Promise.resolve({
        total: 0,
        results: [],
      })
    );

    await act(async () => {
      render(<Character />);
    });

    expect(
      screen.getByText("Nenhum quadrinho encontrado.")
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhuma série encontrada.")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhuma história encontrada.")
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhum evento encontrado.")).toBeInTheDocument();
  });

  it("should correctly page the comics", async () => {
    await act(async () => {
      render(<Character />);
    });

    toBeInTheDocumentMediaPageOne("comics", true);
    toBeInTheDocumentMediaPageTwo("comics", false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonPage(2, 0));
    });

    toBeInTheDocumentMediaPageOne("comics", false);
    toBeInTheDocumentMediaPageTwo("comics", true);
  });

  it("should correctly page the series", async () => {
    await act(async () => {
      render(<Character />);
    });

    toBeInTheDocumentMediaPageOne("series", true);
    toBeInTheDocumentMediaPageTwo("series", false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonPage(2, 1));
    });

    toBeInTheDocumentMediaPageOne("series", false);
    toBeInTheDocumentMediaPageTwo("series", true);
  });

  it("should correctly page the stories", async () => {
    await act(async () => {
      render(<Character />);
    });

    toBeInTheDocumentMediaPageOne("stories", true);
    toBeInTheDocumentMediaPageTwo("stories", false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonPage(2, 2));
    });

    toBeInTheDocumentMediaPageOne("stories", false);
    toBeInTheDocumentMediaPageTwo("stories", true);
  });

  it("should correctly page the events", async () => {
    await act(async () => {
      render(<Character />);
    });

    toBeInTheDocumentMediaPageOne("events", true);
    toBeInTheDocumentMediaPageTwo("events", false);

    page = 2;
    expect(page).toBe(2);

    await act(async () => {
      fireEvent.click(getButtonPage(2, 3));
    });

    toBeInTheDocumentMediaPageOne("events", false);
    toBeInTheDocumentMediaPageTwo("events", true);
  });

  it("should return to the home page", async () => {
    await act(async () => {
      render(<Character />);
    });

    expect(screen.getByRole("button", { name: "voltar" })).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "voltar" }));
    });

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
