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
  @media screen and (min-width: 2560px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 1565px) {
    margin-top: 5rem;
  }

  @media screen and (max-width: 788px) {
    margin-top: 8rem;
  }

  @media screen and (max-width: 750px) {
    margin-top: 12rem;
  }

  @media screen and (max-width: 428px) {
    margin-top: 22rem;
  }

  @media screen and (max-height: 812px) {
    margin-top: 26rem;
  }
`;

export default Categories;
