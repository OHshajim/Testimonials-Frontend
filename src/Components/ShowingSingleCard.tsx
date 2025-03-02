import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { Rating } from "@smastrom/react-rating";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { TestimonialDataType } from "@/Services/TestimonialTypes";

const ShowingSingleCard = ({
  testimonial,
}: {
  testimonial: TestimonialDataType;
}) => {
  console.log(testimonial);

  return (
    <DialogContent className="sm:max-w-[950px] select-none">
      <div className="flex flex-col md:flex-row  items-center gap-5">
        <img src="/profile.png" className="h-28 w-28" />
        <div className="space-y-1">
          <DialogTitle>
            <span className="font-medium">Traveler's Name :</span>{" "}
            {testimonial.TravelerName}
          </DialogTitle>
          <DialogTitle>
            <span className="font-medium">Date of Travel :</span>{" "}
            {testimonial.dateOfTravel}
          </DialogTitle>
          <DialogTitle>
            <span className="font-medium">Favorite Experiences :</span>{" "}
            {testimonial.favoriteExperience}
          </DialogTitle>
        </div>
      </div>
      <div className="flex flex-col ">
        <h3 className="px-3 my-2 bg-[#003B95] text-white font-medium rounded-full max-w-fit">
          {testimonial.country}
        </h3>
        <Rating style={{ maxWidth: 100 }} value={testimonial.rating} readOnly />
      </div>
      <Swiper
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1 },
          720: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.5 },
        }}
      >
        {testimonial.media?.map((med: string, index: number) => (
          <SwiperSlide key={index}>
            {testimonial.mediaType === "photos" ? (
              <img
                src={med}
                alt={`Testimonial image ${index}`}
                className="w-full h-auto rounded-md"
              />
            ) : testimonial.mediaType === "videos" ? (
              <video
                src={med}
                autoPlay
                controls
                className="w-full h-auto rounded-md"
              />
            ) : (
              <p className="text-red-500">Invalid media type</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className=" flex flex-col">
        <label className="text-xl font-medium mb-3">
          Suggestions for future traveler(s):
        </label>
        <textarea
          id="suggestion"
          className="col-span-3 border border-[#7099C8] focus:ring-[#7099C8] bg-transparent rounded-md p-2"
          value={testimonial.suggestion}
          disabled
        />
      </div>
    </DialogContent>
  );
};

export default ShowingSingleCard;
