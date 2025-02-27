import { DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const TestimonialDetails = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="p-2 w-full shadow-lg bg-[#D9F2F7]">
        <DialogTitle className="text-xl font-semibold mb-2">
          Testimonial details
        </DialogTitle>
        <div className="space-y-5">
          <div className=" flex gap-5 justify-between border-t border-gray-400 p-2">
            <h4 className="text-nowrap">Your testimonial :</h4>
            <Textarea
              {...register("testimonial", {
                required: "Testimonial is required",
              })}
              placeholder="Share your experience"
              required
            />
          </div>
          {errors.testimonial && (
            <span className="text-red-500">
              {errors.testimonial.message as string}
            </span>
          )}

          <div className="flex items-center gap-4">
            <h4 className="text-nowrap">Media Type :</h4>
            <Select
              {...register("mediaType", { required: "Media type is required" })}
            >
              <SelectTrigger className="w-full max-w-[250px]">
                <SelectValue placeholder={"Media Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["Photos", "Vedio", "Others"].map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {errors.mediaType && (
            <span className="text-red-500">
              {errors.mediaType.message as string}
            </span>
          )}

          <div className="flex items-center gap-4">
            <h4 className="text-nowrap">Booking ID :</h4>
            <Input
              {...register("bookingId", { required: "Booking ID is required" })}
              type="file"
              className=" py-4 px-4 h-14"
            />
          </div>
          {errors.bookingId && (
            <span className="text-red-500">
              {errors.bookingId.message as string}
            </span>
          )}

          <div className="flex items-center gap-4">
            <h4 className="text-nowrap">Rating for trip :</h4>
            <Rating
              style={{ maxWidth: 200 }}
              value={rating}
              onChange={setRating}
            />
          </div>

          <div className="flex items-center gap-4">
            <h4 className="text-nowrap">Date of travel :</h4>
            <Input
              {...register("dateOfTravel", {
                required: "Date of travel is required",
              })}
              type="date"
              className=" py-4 px-4 h-14"
            />
          </div>
          {errors.dateOfTravel && (
            <span className="text-red-500">
              {errors.dateOfTravel.message as string}
            </span>
          )}

          <div className="flex items-center gap-4">
            <h4 className="text-nowrap">Favorite Experience :</h4>
            <Input
              {...register("favoriteExperience", {
                required: "Favorite experience is required",
              })}
              type="text"
              className=" py-4 px-4 h-14"
            />
          </div>
          {errors.favoriteExperience && (
            <span className="text-red-500">
              {errors.favoriteExperience.message as string}
            </span>
          )}

          <div className=" flex items-center gap-4">
            <h4 className="text-nowrap">Suggestions for future travellers :</h4>
            <Textarea
              {...register("suggestions", {
                required: "Suggestions are required",
              })}
              placeholder="Suggestions for future travellers"
              required
            />
          </div>
          {errors.suggestions && (
            <span className="text-red-500">
              {errors.suggestions.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetails;
