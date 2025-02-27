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
import { accommodations, destinations, TravelTags } from "@/Services/data";
import { Input } from "./ui/input";

interface filterType {
  setSelectedDestination: any;
  setSelectedAccommodation: any;
  setSelectedVibe: any;
  setSelectedDate: any;
  setSelectedRating: any;
  setBudget: any;
  setDuration: any;
  setSort: any;
  selectedAccommodation: string;
  selectedVibe: string;
  selectedDate: string;
  selectedRating: string;
  selectedDestination: string;
  budget: number;
  duration: number;
  sort: boolean;
}

export const Filter = ({
  setSelectedDestination,
  setSelectedAccommodation,
  setSelectedVibe,
  setSelectedDate,
  setSelectedRating,
  setBudget,
  setDuration,
  setSort,
  selectedAccommodation,
  selectedVibe,
  selectedDate,
  selectedRating,
  budget,
  duration,
  sort,
  selectedDestination,
}: filterType) => {
  const ResetAll = () => {
    setSelectedDestination("");
    setSelectedAccommodation("");
    setSelectedVibe("");
    setSelectedDate("");
    setSelectedRating("");
    setBudget(200);
    setDuration(3);
    setSort(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Destination */}
        <Select
          onValueChange={setSelectedDestination}
          value={selectedDestination}
        >
          <SelectTrigger className="w-full max-w-[250px]">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {destinations.map((destination) => (
                <SelectItem key={destination} value={destination}>
                  {destination}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Accommodation */}
        <Select
          onValueChange={setSelectedAccommodation}
          value={selectedAccommodation}
        >
          <SelectTrigger className="w-full max-w-[250px]">
            <SelectValue placeholder="Accommodation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {accommodations.map((accommodation) => (
                <SelectItem key={accommodation} value={accommodation}>
                  {accommodation}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Travel Vibe */}
        <Select onValueChange={setSelectedVibe} value={selectedVibe}>
          <SelectTrigger className="w-full max-w-[250px]">
            <SelectValue placeholder="Travel Vibe" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TravelTags.map((vibe) => (
                <SelectItem key={vibe} value={vibe}>
                  {vibe}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Travel Date */}
        <Input
          type="date"
          className="w-full max-w-[250px] border rounded-md px-3 py-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Ratings */}
        <Select onValueChange={setSelectedRating} value={selectedRating}>
          <SelectTrigger className="w-full max-w-[250px] ">
            <SelectValue placeholder="Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex md:flex-row flex-col w-full items-center gap-6">
        {/* Budget and Duration Sliders */}
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
