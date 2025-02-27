/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Cards from "./Components/Cards";
import { Filter } from "./Components/Filter";
import { Search } from "./Components/Search";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Components/ui/pagination";

const Page = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [budget, setBudget] = useState(200);
  const [duration, setDuration] = useState(3);
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: [
      "testimonials",
      selectedDestination,
      selectedAccommodation,
      selectedVibe,
      selectedDate,
      selectedRating,
      budget,
      duration,
      sort,
      search,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Apply filters
      if (selectedDestination)
        params.append("destination", selectedDestination);
      if (selectedAccommodation)
        params.append("accommodation", selectedAccommodation);
      if (selectedVibe) params.append("travelVibe", selectedVibe);
      if (selectedDate) params.append("date", selectedDate);
      if (selectedRating) params.append("rating", selectedRating);
      if (budget) params.append("minBudget", budget.toString());
      if (duration) params.append("duration", duration.toString());
      if (sort) params.append("sort", "asc");
      if (search) params.append("search", search);
      params.append("page", currentPage.toString());

      const response = await fetch(
        `https://testimonials-backend-topaz.vercel.app/testimonials?${params.toString()}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to fetch testimonials");
      }

      setTotalPages(data.totalPages);
      return data.data;
    },
  });

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto my-20 select-none flex flex-col gap-5">
      <h1 className="text-4xl font-medium">Testimonials</h1>
      <Search Search={setSearch} />
      <Filter
        setSelectedDestination={setSelectedDestination}
        setSelectedAccommodation={setSelectedAccommodation}
        setSelectedVibe={setSelectedVibe}
        setSelectedDate={setSelectedDate}
        setSelectedRating={setSelectedRating}
        setBudget={setBudget}
        setDuration={setDuration}
        setSort={setSort}
        selectedAccommodation={selectedAccommodation}
        selectedVibe={selectedVibe}
        selectedDate={selectedDate}
        selectedRating={selectedRating}
        budget={budget}
        duration={duration}
        sort={sort}
        selectedDestination={selectedDestination}
      />
      <Cards testimonials={testimonials} isLoading={isLoading} />

      {/* Pagination */}
      <Pagination>
        <PaginationContent className="flex-wrap">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(number)}
                isActive={number === currentPage}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Page;
