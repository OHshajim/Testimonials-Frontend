import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";
import { Checkbox } from "@/Components/ui/checkbox";
import { DialogTitle } from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { FormDataType } from "@/Services/FormDataType";

interface TravelsDetailsProps {
  type: string;
  initialData?: FormDataType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TravelsDetails = ({
  type,
  initialData,
  register,
  errors,
}: TravelsDetailsProps) => {
  const TravelTags = [
    "Adventure",
    "Beach",
    "Cultural",
    "Romance",
    "Sightseeing",
    "Food",
    "Luxury",
    "Nature",
    "Historical",
    "Wildlife",
  ];

  const accommodations = [
    "Luxury Hotel",
    "Boutique Hotel",
    "Resort & Spa",
    "Business Hotel",
    "Budget Hotel",
    "Airbnb Apartment",
    "Hostel Dormitory",
    "Bed & Breakfast",
    "Overwater Bungalow",
    "Eco-Lodge",
  ];

  const transportationOptions = [
    "Airplane",
    "Train",
    "Metro/Subway",
    "Taxi",
    "Ride-Sharing",
    "Bus",
    "Rental Car",
    "Bicycle",
    "Ferry/Boat",
    "Walking",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Italian",
    "Portuguese",
    "Arabic",
    "Bangla",
  ];

  const [duration, setDuration] = useState<number>(initialData?.duration || 3);

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

  return (
    <div className="p-2 w-full shadow-lg bg-[#D9F2F7]">
      <DialogTitle className="text-xl font-semibold mb-2">
        Traveler’s details
      </DialogTitle>
      <div className="border-t border-gray-400 p-2 space-y-5">
        {/* Package ID/Trip ID */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Package ID/Trip ID :</h4>
          <Input
            type="text"
            {...register("packageId", { required: "Package ID is required" })}
            disabled={type === "PUT"}
            className={`border p-2 ${errors.packageId ? "border-red-500" : ""}`}
          />
          {errors.packageId && (
            <span className="text-red-500">
              {errors.packageId.message as string}
            </span>
          )}
        </div>

        {/* Country */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Country :</h4>
          <Input
            type="text"
            {...register("country", { required: "Country is required" })}
            disabled={type === "PUT"}
            className={`border p-2 ${errors.country ? "border-red-500" : ""}`}
          />
          {errors.country && (
            <span className="text-red-500">
              {errors.country.message as string}
            </span>
          )}
        </div>

        {/* Cities traveled */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Cities traveled :</h4>
          <Input
            type="text"
            {...register("cities", { required: "Cities are required" })}
            disabled={type === "PUT"}
            className={`border p-2 ${errors.cities ? "border-red-500" : ""}`}
          />
          {errors.cities && (
            <span className="text-red-500">
              {errors.cities.message as string}
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Duration :</h4>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={"outline"}
              onClick={handleDecrease}
              disabled={type === "PUT"}
              className="p-3"
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
              disabled={type === "PUT"}
              onChange={(e) => {
                const value = Number(e.target.value);
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
              className="p-3"
            >
              +
            </Button>
          </div>
        </div>

        {/* Travel Type */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Travel type :</h4>
          <Select
            {...register("travelType", { required: "Travel type is required" })}
            disabled={type === "PUT"}
          >
            <SelectTrigger className="w-full max-w-[250px]">
              <SelectValue
                placeholder={initialData?.travelType || "Travel type"}
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
          {errors.travelType && (
            <span className="text-red-500">
              {errors.travelType.message as string}
            </span>
          )}
        </div>

        {/* Travel Tags */}
        <div className="flex items-start gap-4">
          <h4 className="text-nowrap">Tags :</h4>
          <div className="flex gap-4 flex-wrap">
            {TravelTags.map((tag) => (
              <div className="flex items-center space-x-2" key={tag}>
                <Checkbox
                  {...register("tags")}
                  value={tag}
                  disabled={type === "PUT"}
                />
                <label htmlFor={tag} className="text-sm font-medium">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodations */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Accommodations :</h4>
          <Select
            {...register("accommodations", {
              required: "Accommodations are required",
            })}
            disabled={type === "PUT"}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  initialData?.accommodations || "-select multiple options-"
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
          {errors.accommodations && (
            <span className="text-red-500">
              {errors.accommodations.message as string}
            </span>
          )}
        </div>

        {/* Transport used */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Transport used :</h4>
          <Select
            {...register("transportUsed", {
              required: "Transport used is required",
            })}
            disabled={type === "PUT"}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  initialData?.transportUsed || "-select multiple options-"
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
          {errors.transportUsed && (
            <span className="text-red-500">
              {errors.transportUsed.message as string}
            </span>
          )}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Languages :</h4>
          <Select
            {...register("languages", { required: "Languages are required" })}
            disabled={type === "PUT"}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  initialData?.language || "-select multiple options-"
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
          {errors.languages && (
            <span className="text-red-500">
              {errors.languages.message as string}
            </span>
          )}
        </div>

        {/* Social media handle */}
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Social media handle :</h4>
          <Input
            type="text"
            {...register("socialHandle", {
              required: "Social handle is required",
            })}
            disabled={type === "PUT"}
            className={`border p-2 ${
              errors.socialHandle ? "border-red-500" : ""
            }`}
          />
          {errors.socialHandle && (
            <span className="text-red-500">
              {errors.socialHandle.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelsDetails;
