import { IoIosArrowForward } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";
import { CgSortZa, CgSortAz } from "react-icons/cg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useState } from "react";

export const Filter = () => {
  const destinations = ["Bali", "Balli", "Baali"];
  const ratings = [1, 2, 3, 4, 5];
  const [budget, setBudget] = useState(200);
  const [duration, setDuration] = useState(3);
  const [sort, setSort] = useState(false);

  const ResetAll = () => {
    setBudget(200);
    setDuration(3);
    setSort(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          { label: "Destination", options: destinations },
          { label: "Accommodation", options: destinations },
          { label: "Travel Vibe", options: destinations },
          { label: "Travel Date", options: destinations },
        ].map(({ label, options }) => (
          <Select key={label}>
            <SelectTrigger className="w-full max-w-[250px]">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
        {/* Ratings */}
        <Select>
          <SelectTrigger className="w-full max-w-[250px]">
            <SelectValue placeholder="Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ratings.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex md:flex-row flex-col w-full items-center  gap-6">
        {[
          {
            label: "Budget",
            state: budget,
            setState: setBudget,
            min: 200,
            max: 3000,
            step: 100,
            unit: "$",
          },
          {
            label: "Duration",
            state: duration,
            setState: setDuration,
            min: 3,
            max: 14,
            step: 1,
            unit: "N",
          },
        ].map(({ label, state, setState, min, max, step, unit }) => (
          <div
            key={label}
            className="flex flex-col w-full max-w-[400px] p-4 border rounded-lg shadow-sm bg-[#D9F2F7] border-[#A8C8E1]"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <IoIosArrowForward className="text-lg mr-2" /> {label}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setState(min)}
                className="flex items-center gap-1"
              >
                Reset <FaArrowsRotate className="text-xs" />
              </Button>
            </div>
            <Slider
              className="mt-2"
              value={[state]}
              min={min}
              max={max}
              step={step}
              onValueChange={(val) => setState(val[0])}
            />
            <p className="text-sm mt-1 text-gray-600">
              {state}
              {unit}
            </p>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex md:flex-col gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setSort(!sort)}
            className="flex items-center gap-2"
          >
            Sort By{" "}
            {sort ? (
              <CgSortZa className="text-xl" />
            ) : (
              <CgSortAz className="text-xl" />
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={ResetAll}
            className="flex items-center gap-2"
          >
            Reset All <FaArrowsRotate className="text-sm" />
          </Button>
        </div>
      </div>
    </div>
  );
};
