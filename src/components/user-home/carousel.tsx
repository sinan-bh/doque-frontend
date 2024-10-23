"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Card from "@/components/user-home/card";
import { TemplateCard } from "./template-card";
import { templateList } from "@/consts/templates";

interface CarouselProps {
  cards: { title: string; description?: string; image: string }[];
}

export default function Carousel({ cards }: CarouselProps) {
  const [carouselRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="relative">
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex">
          {templateList.map((template, index) => (
            <div key={index} className="shrink-0 basis-[250px] p-2">
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
