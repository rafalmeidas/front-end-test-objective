import { render, fireEvent, screen } from "@testing-library/react";
import Router from "react-router-dom";

import CharacterCard from "../../../components/character-card/character-card";

import { Character } from "../../../types/marvels";

const CHARACTER: Character = {
  id: 1,
  name: "Spider-Man",
  description: "Amigo da vizinhança",
  thumbnail: {
    path: "path/to/image",
    extension: "jpg",
  },
  comics: {
    available: 1,
    returned: 1,
    collectionURI:
      "http://gateway.marvel.com/v1/public/characters/1009420/comics",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/comics/57849",
        name: "Adventure Into Fear (1970) #10",
      },
    ],
  },
  events: {
    available: 1,
    collectionURI:
      "http://gateway.marvel.com/v1/public/characters/1009420/events",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/events/57849",
        name: "Civil War",
      },
    ],
    returned: 1,
  },
  series: {
    available: 1,
    collectionURI:
      "http://gateway.marvel.com/v1/public/characters/1009420/series",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/series/57849",
        name: "Amazing Spider-Man",
      },
    ],
    returned: 1,
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<CharacterCard />", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it("should render the character card correctly", () => {
    render(<CharacterCard character={CHARACTER} />);

    const characterName = screen.getByText("Spider-Man");
    const thumbnailImage = screen.getByAltText("Spider-Man");
    const seriesList = screen.getByText("Amazing Spider-Man");
    const eventsList = screen.getByText("Civil War");

    expect(characterName).toBeInTheDocument();
    expect(thumbnailImage).toBeInTheDocument();
    expect(seriesList).toBeInTheDocument();
    expect(eventsList).toBeInTheDocument();
  });

  it("should navigate to the character details page when clicked", () => {
    render(<CharacterCard character={CHARACTER} />);

    fireEvent.click(screen.getByText("Spider-Man"));

    expect(navigate).toHaveBeenCalledWith("/character/1");
  });
});
