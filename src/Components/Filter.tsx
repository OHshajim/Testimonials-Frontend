import { IoIosArrowForward } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdOutlineSort } from "react-icons/md";
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

  return (
    <div>
      <div className="flex flex-wrap items-center gap-5">
        {[
          { label: "Destination", options: destinations },
          { label: "Accommodation", options: destinations },
          { label: "Travel Vibe", options: destinations },
          { label: "Travel Date", options: destinations },
        ].map(({ label, options }) => (
          <Select key={label}>
            <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
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
      <div className=" flex flex-wrap items-center gap-5 ">
        <div className="flex gap-5 flex-wrap">
          <div className="flex flex-col w-[500px] p-4 border rounded-lg shadow-sm bg-[#D9F2F7] border-[#A8C8E1] mt-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium flex items-center">
                <IoIosArrowForward className="text-lg" /> Budget
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBudget(200);
                }}
              >
                Reset <FaArrowsRotate className="text-[4px]" />
              </Button>
            </div>
            <Slider
              className="mt-2"
              value={[budget]}
              min={200}
              max={3000}
              step={100}
              onValueChange={(val) => setBudget(val[0])}
            />
            <p className="text-sm mt-1 text-gray-600">${budget}</p>
          </div>
          <div className="flex flex-col w-[500px] p-4 border rounded-lg shadow-sm bg-[#D9F2F7] border-[#A8C8E1] mt-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium flex items-center">
                <IoIosArrowForward className="text-lg" /> Duration
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDuration(3);
                }}
              >
                Reset <FaArrowsRotate className="text-[4px]" />
              </Button>
            </div>
            <Slider
              className="mt-2"
              value={[duration]}
              min={3}
              max={14}
              step={1}
              onValueChange={(val) => setDuration(val[0])}
            />
            <p className="text-sm mt-1 text-gray-600">{duration}N</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Button variant="outline" size="lg">
            Sort By <MdOutlineSort />
          </Button>
          <Button variant="outline" size="lg">
            Reset All
            <FaArrowsRotate className="text-[4px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
