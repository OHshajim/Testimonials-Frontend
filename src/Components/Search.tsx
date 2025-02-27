import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export function Search({ Search }: { Search: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    Search(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center space-x-2"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by keywords..."
        className="border-none rounded-full"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
