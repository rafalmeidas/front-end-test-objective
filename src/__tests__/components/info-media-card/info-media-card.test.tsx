import { render, screen } from "@testing-library/react";

import InfoMediaCard from "../../../components/info-media-card/info-media-card";

describe("<InfoMediaCard />", () => {
  it("should render correctly with an image and a title", () => {
    const src = "image.jpg";
    const title = "Card Title";

    render(<InfoMediaCard src={src} title={title} />);

    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render "N/D" when src is not provided', () => {
    const title = "Card Title";

    render(<InfoMediaCard title={title} src="" />);

    expect(screen.getByText("N/D")).toBeInTheDocument();
  });
});
