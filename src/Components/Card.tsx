import { TestimonialDataType } from "@/Services/TestimonialTypes";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Card = ({
  testimonial,
  setTest,
}: {
  testimonial: TestimonialDataType;
  setTest: (testimonial: TestimonialDataType) => void;
}) => {
  const { name, country, rating, testimonial: description } = testimonial;

  return (
    <div
      className="bg-white p-5 shadow-xl relative w-[420px] h-[500px] my-8 cursor-pointer"
      onClick={() => setTest(testimonial)}
    >
      <div className="flex justify-center w-full items-center mb-10">
        <img
          src="/profile.png"
          alt="testimonial image"
          className="absolute -top-10"
        />
      </div>
      <h3 className="text-base text-black text-center my-2">
        <span className="font-semibold">Traveler Name:</span> {name}
      </h3>
      <img src="/image.png" alt="testimonial image" className="w-full" />
      <div className="flex justify-between items-center my-2">
        <h3 className="px-3 bg-[#003B95] text-white font-medium rounded-full">
          {country}
        </h3>
        <Rating style={{ maxWidth: 100 }} value={rating} readOnly />
      </div>
      <p className="text-center font-medium mt-5">"{description}"</p>
    </div>
  );
};

export default Card;
