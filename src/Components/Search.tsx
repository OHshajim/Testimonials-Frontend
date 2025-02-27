import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex w-full items-center space-x-2 ">
      <Input type="text" placeholder="Search by keywords..."  className="border-none rounded-full"/>
      <Button type="submit">Search</Button>
    </div>
  );
}
