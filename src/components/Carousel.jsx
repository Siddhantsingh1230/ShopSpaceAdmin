import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  const imageByIndex = (index) => slides[index % slides.length];
  return (
    <>
      <div className="embla cursor-grab relative left-fog right-fog">
        <div className="embla__viewport " ref={emblaRef}>
          <div className="embla__container">
            {slides.map((_, index) => (
              <div className="embla__slide" key={index}>
                <img
                  className="embla__slide__img cursor-pointer"
                  src={imageByIndex(index)}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
