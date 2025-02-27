import { useState } from "react";
import Card from "./Card";
import { Button } from "./ui/button";
import ShowingSingleCard from "./ShowingSingleCard";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { TestimonialDataType } from "@/Services/TestimonialTypes";
import Post from "./Post/Post";

const Cards = ({
  testimonials,
  isLoading,
}: {
  testimonials: [];
  isLoading: boolean;
}) => {
  const [testimonial, setTest] = useState<TestimonialDataType | null>(null);
  const [updateOne, setUpdateOne] = useState<TestimonialDataType | null>(null);

  const ModalClose = () => {
    setTest(null);
    setUpdateOne(null);
  };
  if (isLoading) return;
  if (testimonials.length < 1)
    return (
      <h3 className="text-center my-20 text-xl font-bold text-red-400">
        No Data Available !!!
      </h3>
    );
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
      </div>

      {/* Single Testimonial Modal */}
      {testimonial && (
        <Dialog open={!!testimonial} onOpenChange={ModalClose}>
          <DialogTrigger asChild>
            <Button className="hidden">View Testimonial</Button>
          </DialogTrigger>
          <ShowingSingleCard testimonial={testimonial} />
        </Dialog>
      )}

      {/* Update Modal */}
      {updateOne && (
        <Dialog open={!!updateOne} onOpenChange={ModalClose}>
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
