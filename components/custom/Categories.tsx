"use client";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();
  const onClick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/");
  };
  return (
    <CategoryStyle className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onClick(null)}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </CategoryStyle>
  );
};

const CategoryStyle = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 20rem;
  }
`;

export default Categories;
