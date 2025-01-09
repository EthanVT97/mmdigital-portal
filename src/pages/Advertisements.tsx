import { useQuery } from "@tanstack/react-query";
import { advertisementService } from "@/services/advertisementService";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Advertisements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => advertisementService.getCategories(),
  });

  const { data: adsData, isLoading } = useQuery({
    queryKey: ["advertisements", searchTerm, selectedCategory, page],
    queryFn: () =>
      advertisementService.getAll({
        search: searchTerm,
        category: selectedCategory,
        page,
        per_page: 9,
      }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Advertisements</h1>

      <div className="flex gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-4">
          <Input
            type="text"
            placeholder="Search advertisements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categoriesData?.data?.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adsData?.data?.map((ad: any) => (
              <Card key={ad.id}>
                {ad.image_url && (
                  <img
                    src={`http://127.0.0.1:8000${ad.image_url}`}
                    alt={ad.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle>{ad.title}</CardTitle>
                  <CardDescription>{ad.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{ad.description}</p>
                  <p className="text-lg font-bold mt-2">${ad.price}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Contact: {ad.contact_info}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!adsData?.next_page_url}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Advertisements;
