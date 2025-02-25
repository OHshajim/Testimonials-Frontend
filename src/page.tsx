import { Filter } from "./Components/Filter";
import { Search } from "./Components/Search";

const Page = () => {
  return (
    <div className="container mx-auto my-20 select-none flex flex-col gap-5">
      <text className="text-4xl font-medium ">Testimonials</text>
      <Search />
      <Filter />
    </div>
  );
};

export default Page;
