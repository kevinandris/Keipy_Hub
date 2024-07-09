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
  /* Width */
  @media screen and (max-width: 2560px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 1786px) {
    margin-top: 5rem;
  }

  @media screen and (max-width: 1681px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1621px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1619px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1611px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1609px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1603px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1599px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1597px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1595px) {
    margin-top: 9.5rem;
  }

  @media screen and (max-width: 1593px) {
    margin-top: 10rem;
  }

  @media screen and (max-width: 1583px) {
    margin-top: 12rem;
  }

  @media screen and (max-width: 1581px) {
    margin-top: 12rem;
  }

  @media screen and (max-width: 1565px) {
    margin-top: 13rem;
  }

  @media screen and (max-width: 1354px) {
    margin-top: 13rem;
  }

  @media screen and (max-width: 1230px) {
    margin-top: 12rem;
  }

  @media screen and (max-width: 859px) {
    margin-top: 16rem;
  }

  @media screen and (max-width: 810px) {
    margin-top: 13rem;
  }

  @media screen and (max-width: 800px) {
    margin-top: 11rem;
  }

  @media screen and (max-width: 788px) {
    margin-top: 16rem;
  }

  @media screen and (max-width: 768px) {
    margin-top: 16rem;
  }

  @media screen and (max-width: 750px) {
    margin-top: 16rem;
  }

  @media screen and (max-width: 670px) {
    margin-top: 16rem;
  }

  @media screen and (max-width: 655px) {
    margin-top: 19rem;
  }

  @media screen and (max-width: 513px) {
    margin-top: 22rem;
  }

  @media screen and (max-width: 435px) {
    margin-top: 26rem;
  }

  @media screen and (max-width: 428px) {
    margin-top: 24rem;
  }

  @media screen and (max-width: 414px) {
    margin-top: 24rem;
  }

  @media screen and (max-width: 381px) {
    margin-top: 29rem;
  }

  @media screen and (max-width: 375px) {
    margin-top: 28rem;
  }

  @media screen and (max-width: 360px) {
    margin-top: 28rem;
  }

  @media screen and (max-width: 345px) {
    margin-top: 32rem;
  }

  @media screen and (max-width: 335px) {
    margin-top: 35rem;
  }

  @media screen and (max-width: 309px) {
    margin-top: 38rem;
  }

  @media screen and (max-width: 303px) {
    margin-top: 41rem;
  }

  @media screen and (max-width: 265px) {
    margin-top: 45rem;
  }

  @media screen and (max-width: 249px) {
    margin-top: 48rem;
  }

  @media screen and (max-width: 227px) {
    margin-top: 51rem;
  }

  @media screen and (max-width: 215px) {
    margin-top: 54rem;
  }

  @media screen and (max-width: 213px) {
    margin-top: 57rem;
  }

  /* Height */
  /* @media screen and (max-height: 1025px) {
    margin-top: 6rem;
  } */

  /* @media screen and (max-height: 987px) {
    margin-top: 10rem;
  } */

  /* @media screen and (min-height: 760px) {
    margin-top: 22rem;
  } */

  /* @media screen and (max-height: 730px) {
    margin-top: 25rem;
  }

  @media screen and (max-height: 721px) {
    margin-top: 24.5rem;
  }

  @media screen and (max-height: 717px) {
    margin-top: 24rem;
  }

  @media screen and (max-height: 667px) {
    margin-top: 30rem;
  }

  @media screen and (max-height: 664px) {
    margin-top: 25rem;
  }

  @media screen and (max-height: 658px) {
    margin-top: 25rem;
  }

  @media screen and (max-height: 649px) {
    margin-top: 25rem;
  }

  @media screen and (max-height: 641px) {
    margin-top: 25rem;
  }

  @media screen and (max-height: 629px) {
    margin-top: 25rem;
  } */
`;

export default Categories;
