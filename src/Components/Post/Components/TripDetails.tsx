import { DialogTitle } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

type TripDetailsProps = {
  type: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const TripDetails = ({ type, register, errors }: TripDetailsProps) => {
  return (
    <div className="p-2 w-full shadow-lg bg-[#D9F2F7]">
      <DialogTitle className="text-xl font-semibold mb-2">
        Trip Details
      </DialogTitle>
      <div className="flex gap-5 justify-between border-t border-gray-400 p-2 py-5">
        <div className="flex items-center gap-4">
          <h4 className="text-nowrap">Package ID/Trip ID :</h4>
          <Input
            type="number"
            {...register("packageId", { required: "Package ID is required" })}
            disabled={type === "PUT"}
            required
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
            type="number"
            {...register("bookingId", { required: "Booking ID is required" })}
            disabled={type === "PUT"}
            required
          />
          {errors.bookingId && (
            <p className="text-red-500 text-sm">
              {errors.bookingId?.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
