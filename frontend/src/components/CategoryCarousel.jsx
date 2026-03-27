import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];
function CategoryCarousel() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [query,setQuery]=useState("");

    const searchJobHandler=(query)=>{
      dispatch(setSearchQuery(query));
      navigate("/browse");
    }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselPrevious />
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <Button variant="outline" className="rounded-full cursor-pointer" onClick={()=>searchJobHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
