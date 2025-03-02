import { DialogContent, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import { Textarea } from "@/Components/ui/textarea";
import { Rating } from "@smastrom/react-rating";
import {
  accommodations,
  activities,
  languages,
  transportationOptions,
  TravelTags,
} from "@/Services/data";
import { TestimonialDataType } from "@/Services/TestimonialTypes";
import { DialogClose } from "@radix-ui/react-dialog";

interface Post {
  type: string;
  testimonial?: TestimonialDataType;
}

const Post = ({ type, testimonial }: Post) => {
  const [isActive, setActive] = useState(true);
  const [duration, setDuration] = useState<number>(testimonial?.duration || 3);
  const handleIncrease = () => {
    if (duration < 14) {
      setDuration((prev) => prev + 1);
    }
  };
  const handleDecrease = () => {
    if (duration > 3) {
      setDuration((prev) => prev - 1);
    }
  };
  const [rating, setRating] = useState(testimonial?.duration || 5);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: testimonial });
  const onSubmit = async (data: TestimonialDataType) => {
    try {
      setActive(false);
      const formData = new FormData();
      const mediaFiles = Array.from(data.media);
      mediaFiles.forEach((file) => {
        formData.append("media", file);
      });
      console.log(formData);

      const res = await fetch(
        // "http://localhost:5000/MediaHosting",
        "https://testimonials-lac-nu.vercel.app/MediaHosting",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );
      const responseData = await res.json();
      console.log(responseData);
      if (responseData.success) {
        const PostData = {
          ...data,
          media: responseData.HostingURLs,
          rating,
        };
        const DataSave = await fetch(
          "https://testimonials-lac-nu.vercel.app/testimonial",
          {
            method: type,
            body: JSON.stringify(PostData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await DataSave.json();

        if (response.success) {
          setActive(true);
          alert(
            "Successfully done!Tank you so much for your valuable time !!!"
          );
          const closer = document.querySelector(
            "[data-dialog-close]"
          ) as HTMLButtonElement;
          return closer.click();
        } else {
          setActive(true);
          return alert("Please try again");
        }
      } else {
        setActive(true);
        console.error("Media upload failed:", responseData);
        return alert(responseData.error.message);
      }
    } catch (error) {
      setActive(true);
      console.log(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[1000px] select-none bg-[#E0F7FA] overflow-y-auto max-h-[80vh]">
      <DialogTitle className="text-2xl font-semibold">
        {type === "POST"
          ? "Testimonial Create Form"
          : "Testimonial Update Form"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-2 w-full shadow-lg bg-[#D9F2F7]">
          <DialogTitle className="text-xl font-semibold mb-2">
            Trip Details
          </DialogTitle>

          {/*  Trip Details */}
          <div className="flex gap-5 justify-between border-t border-gray-400 p-2 py-5">
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Package ID/Trip ID :</h4>
              <Input
                type="text"
                {...register("packageId", {
                  required: "Package ID is required",
                })}
                disabled={type === "PUT"}
              />
              {errors.packageId && (
                <p className="text-red-500 text-sm">
                  {errors.packageId?.message as string}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Booking ID :</h4>
              <Input
                type="text"
                {...register("bookingId", {
                  required: "Booking ID is required",
                })}
                disabled={type === "PUT"}
              />
              {errors.bookingId && (
                <p className="text-red-500 text-sm">
                  {errors.bookingId?.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-2 w-full shadow-lg bg-[#D9F2F7]">
          <DialogTitle className="text-xl font-semibold mb-2">
            Traveler’s details
          </DialogTitle>
          <div className="border-t border-gray-400 p-2 space-y-5">
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Traveler’s name :</h4>
              <Input
                type="text"
                {...register("TravelerName", {
                  required: "Traveler’s name  is required",
                })}
                disabled={type === "PUT"}
                className={`border p-2 ${
                  errors.TravelerName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.TravelerName && (
              <span className="text-red-500 ">
                {errors.TravelerName.message as string}
              </span>
            )}

            {/* Country */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Country :</h4>
              <Input
                type="text"
                {...register("country", { required: "Country is required" })}
                disabled={type === "PUT"}
                className={`border p-2 ${
                  errors.country ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.country && (
              <span className="text-red-500">
                {errors.country.message as string}
              </span>
            )}

            {/* Cities traveled */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Cities traveled :</h4>
              <Input
                type="text"
                {...register("cities", { required: "Cities are required" })}
                disabled={type === "PUT"}
                className={`border p-2 ${
                  errors.cities ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.cities && (
              <span className="text-red-500">
                {errors.cities.message as string}
              </span>
            )}

            {/* Duration */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Duration :</h4>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleDecrease}
                  disabled={type === "PUT"}
                  className="p-3 font-bold"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={duration}
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 3,
                      message: "Duration cannot be less than 3 days",
                    },
                    max: {
                      value: 14,
                      message: "Duration cannot be more than 14 days",
                    },
                  })}
                  readOnly
                  disabled={type === "PUT"}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setValue("duration", value);
                    setDuration(value);
                  }}
                  className="w-14 p-2 m-0"
                />
                {errors.duration && (
                  <span className="text-red-500">
                    {errors.duration.message as string}
                  </span>
                )}
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleIncrease}
                  disabled={type === "PUT"}
                  className="p-3 font-bold"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Travel Type */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Travel type :</h4>
              <Select
                onValueChange={(value) => setValue("travelType", value)}
                disabled={type === "PUT"}
                required
              >
                <SelectTrigger className="w-full max-w-[250px]">
                  <SelectValue
                    placeholder={
                      type === "PUT" ? testimonial?.travelType : "Travel type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Couple", "Family", "Friends", "Solo"].map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.travelType && (
              <span className="text-red-500">
                {errors.travelType.message as string}
              </span>
            )}

            {/* Travel Tags */}
            <div className="flex items-start gap-4">
              <h4 className="text-nowrap">Travel tags :</h4>
              <div className="flex gap-4 flex-wrap">
                {TravelTags.map((tag) => (
                  <div className="flex items-center space-x-2" key={tag}>
                    <Checkbox
                      checked={watch("travelTags")?.includes(tag)}
                      onCheckedChange={(checked) => {
                        const currentTags = watch("travelTags") || [];
                        const updatedTags = checked
                          ? [...currentTags, tag]
                          : currentTags.filter((t: string) => t !== tag);

                        setValue("travelTags", updatedTags, {
                          shouldValidate: true,
                        });
                      }}
                      disabled={type === "PUT"}
                    />
                    <label className="text-sm font-medium">{tag}</label>
                  </div>
                ))}
              </div>

              <input
                type="hidden"
                {...register("travelTags", {
                  validate: (value) =>
                    value?.length > 0 || "At least one tag is required",
                })}
              />
            </div>
            {errors.travelTags && (
              <p className="text-red-500 text-sm">
                {errors.travelTags.message as string}
              </p>
            )}

            {/* Accommodations */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Accommodations :</h4>
              <Select
                onValueChange={(value) => setValue("accommodations", value)}
                disabled={type === "PUT"}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      type === "PUT"
                        ? testimonial?.accommodations
                        : "-select multiple options-"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {accommodations.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.accommodations && (
              <span className="text-red-500">
                {errors.accommodations.message as string}
              </span>
            )}

            {/* Transport used */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Transport used :</h4>
              <Select
                onValueChange={(value) => setValue("transportUsed", value)}
                disabled={type === "PUT"}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      type === "PUT"
                        ? testimonial?.transportUsed
                        : "-select multiple options-"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {transportationOptions.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.transportUsed && (
              <span className="text-red-500">
                {errors.transportUsed.message as string}
              </span>
            )}
            {/* Activities & AtTractions Visited  */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">
                Activities & AtTractions Visited :
              </h4>
              <Select
                onValueChange={(value) => setValue("activities", value)}
                disabled={type === "PUT"}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      type === "PUT"
                        ? testimonial?.activities
                        : "-select multiple options-"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {activities.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.activities && (
              <span className="text-red-500">
                {errors.activities.message as string}
              </span>
            )}

            {/* Customer Demographics : */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Customer Demographics :</h4>
              <Input
                type="text"
                {...register("demographic", {
                  required: "Customer Demographics is required",
                })}
                disabled={type === "PUT"}
                className={`border p-2 ${
                  errors.demographic ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.demographic && (
              <span className="text-red-500">
                {errors.demographic.message as string}
              </span>
            )}

            {/* Languages */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Languages :</h4>
              <Select
                onValueChange={(value) => setValue("language", value)}
                disabled={type === "PUT"}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      type === "PUT"
                        ? testimonial?.accommodations
                        : "-select multiple options-"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {languages.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.language && (
              <span className="text-red-500">
                {errors.language.message as string}
              </span>
            )}

            {/* Social media handle */}
            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Social media handle :</h4>
              <Input
                type="text"
                {...register("socialHandle", {
                  required: "Social media handle is required",
                })}
                disabled={type === "PUT"}
                className={`border p-2 ${
                  errors.socialHandle ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.socialHandle && (
              <span className="text-red-500">
                {errors.socialHandle.message as string}
              </span>
            )}
          </div>
        </div>
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
                onValueChange={(value) => setValue("mediaType", value)}
                required
              >
                <SelectTrigger className="w-full max-w-[250px]">
                  <SelectValue placeholder={"Media Type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Photos", "Videos", "Others"].map((option) => (
                      <SelectItem key={option} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4 relative">
              <h4 className="text-nowrap">Upload media :</h4>
              <Input
                {...register("media", {
                  required: "Media is required",
                })}
                type="file"
                className=" py-4 px-4 h-14"
                multiple
                size={5000}
              />
              <p className="absolute top-5 right-4 text-xs text-[#003B95]">
                max limit only 5 mb
              </p>
            </div>
            {errors.media && (
              <span className="text-red-500">
                {errors.media.message as string}
              </span>
            )}

            <div className="flex items-center gap-4">
              <h4 className="text-nowrap">Rating for trip :</h4>
              <Rating
                style={{ maxWidth: 200 }}
                value={rating}
                onChange={(value: number) => {
                  setRating(value);
                  setValue("rating", value);
                }}
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
              <h4 className="text-nowrap">
                Suggestions for future travellers :
              </h4>
              <Textarea
                {...register("suggestion", {
                  required: "Suggestion are required",
                })}
                placeholder="Suggestions for future travellers"
              />
            </div>
            {errors.suggestion && (
              <span className="text-red-500">
                {errors.suggestion.message as string}
              </span>
            )}
          </div>
        </div>
        <Button
          className="rounded-md w-full"
          type="submit"
          disabled={!isActive}
        >
          {type === "PUT" ? "Update Testimonial" : "Post"}
        </Button>
        <DialogClose data-dialog-close className="hidden" />
      </form>
    </DialogContent>
  );
};

export default Post;
