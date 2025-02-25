import { useState } from "react";
import { dummyTestimonials } from "@/Services/data";
import Card from "./Card";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import ShowingSingleCard from "./ShowingSingleCard";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { TestimonialDataType } from "@/Services/TestimonialTypes";

const Cards = () => {
  const [testimonial, setTest] = useState<TestimonialDataType | null>(null);

  return (
    <div className="container mx-auto px-4">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {dummyTestimonials.map((testimonial) => (
          <Card
            testimonial={testimonial}
            key={testimonial.packageId}
            setTest={setTest}
          />
        ))}
      </div>

      {/* Pagination & Button Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-10 gap-4">
        <Button className="rounded-md w-full sm:w-auto">
          Post Testimonial
        </Button>
        <Pagination>
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Single Testimonial Modal */}
      {testimonial && (
        <Dialog open={!!testimonial} onOpenChange={() => setTest(null)}>
          <DialogTrigger asChild>
            <Button className="hidden">View Testimonial</Button>
          </DialogTrigger>
          <ShowingSingleCard testimonial={testimonial} />
        </Dialog>
      )}
    </div>
  );
};

export default Cards;
