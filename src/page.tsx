import Cards from "./Components/Cards";
import { Filter } from "./Components/Filter";
import { Search } from "./Components/Search";
import "@smastrom/react-rating/style.css";

const Page = () => {
  return (
    <div className="container mx-auto my-20 select-none flex flex-col gap-5">
      <h1 className="text-4xl font-medium ">Testimonials</h1>
      <Search />
      <Filter />
      <Cards />
    </div>
  );
};

export default Page;
