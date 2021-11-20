import { Carousel, Image } from "antd";
import { placeholdUrl } from "../../define";
import styled from "styled-components";

const images = [
  { src: placeholdUrl + "1920x200", alt: "dummy" },
  { src: placeholdUrl + "1920x200", alt: "dummy" },
  { src: placeholdUrl + "1920x200", alt: "dummy" },
];

const CarouselImage = styled(Image)`
  height: 200px;
`;

const MainCarousel = () => {
  return (
    <Carousel autoplay>
      {images.map((v: any, i: number) => (
        <CarouselImage src={v.src} alt={v.alt} key={i} />
      ))}
    </Carousel>
  );
};

export default MainCarousel;
