import { useState } from "react";
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
import Post from "./Post/Post";
import { useQuery } from "@tanstack/react-query";

const Cards = () => {
  const [testimonial, setTest] = useState<TestimonialDataType | null>(null);
  const [updateOne, setUpdateOne] = useState<TestimonialDataType | null>(null);
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/testimonials");
      const data = await response.json();
      if (!data.success) {
        throw new Error("Failed to fetch testimonials");
      }
      return data.data;
    },
  });
  if (isLoading) return;
  return (
    <div className="container mx-auto px-4">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
        {testimonials.map((testimonial: TestimonialDataType) => (
          <Card
            testimonial={testimonial}
            key={testimonial.id}
            setTest={setTest}
            setUpdateOne={setUpdateOne}
          />
        ))}
      </div>

      {/* Pagination & Button Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-10 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-md w-full sm:w-auto">
              Post Testimonial
            </Button>
          </DialogTrigger>
          <Post type="POST" />
        </Dialog>
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
      {updateOne && (
        <Dialog open={!!testimonial} onOpenChange={() => setTest(null)}>
          <DialogTrigger asChild>
            <Button className="hidden">View Testimonial</Button>
          </DialogTrigger>
          <Post type="PUT" testimonial={updateOne} />
        </Dialog>
      )}
    </div>
  );
};

export default Cards;
