import { render, fireEvent, screen } from "@testing-library/react";

import CharacterSearch from "../../../components/character-search/character-search";

describe("<CharacterSearch />", () => {
  it("should render the search field correctly", () => {
    render(<CharacterSearch onChange={() => {}} value="" />);

    const label = screen.getByLabelText("Nome do personagem");
    const input = screen.getByPlaceholderText("Search");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should call the onChange function when typing in the search field", () => {
    const mockOnChange = jest.fn();
    render(<CharacterSearch onChange={mockOnChange} value="" />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Spider-Man" } });

    expect(mockOnChange).toHaveBeenCalledWith("Spider-Man");
  });
});
