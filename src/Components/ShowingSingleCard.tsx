import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "./ui/button";
import { DialogContent, DialogFooter, DialogTitle } from "./ui/dialog";

interface testimonialProps {
  name: string;
  country: string;
  dateOfTravel: string;
  favoriteExperience: string;
  rating: number;
}

const ShowingSingleCard = ({
  testimonial,
}: {
  testimonial: testimonialProps;
}) => {
  return (
    <DialogContent className="sm:max-w-[950px] select-none">
      <div className="flex  items-center gap-5">
        <img src="/public/profile.png" className="h-28 w-28" />
        <div className="space-y-1">
          <DialogTitle>
            <span className="font-medium">Traveler's Name :</span>{" "}
            {testimonial.name}
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
      <div className=" flex flex-col">
        <label className="text-2xl font-medium mb-3">
          Suggestions for future traveler(s):
        </label>
        <textarea
          id="suggestion"
          className="col-span-3 border border-[#7099C8] focus:ring-[#7099C8] bg-transparent rounded-md p-2"
        />
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ShowingSingleCard;
