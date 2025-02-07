"use client";
import MegaMenu from "@/components/shared/mega-menu/mega-menu";
import GetCategories from "@/lib/get_categories";
import GetHightLights from "@/lib/get_highlights";
import React from "react";
interface Category {
  _id: string;
  label: string;
  image: string;
  title: string;
  name: string;
  price: number;
}
interface HighLightSectionProps {
  category: string;
  highlight: string;
}
const HighLightSection: React.FC<HighLightSectionProps> = ({
  category,
  highlight,
}) => {
  const [mensCategories, setMensCategories] = React.useState<Category[]>([]);
  const [highlights, setHighlights] = React.useState<Category[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [mensResponse, highlightsResponse] = await Promise.all([
          GetCategories(category === "Fashion Categories" ? "" : category),
          GetHightLights({ category: highlight }),
        ]);

        setMensCategories(mensResponse);
        setHighlights(
          highlightsResponse.map(
            (highlight: {
              image: unknown;
              title: unknown;
              label: unknown;
            }) => ({
              ...highlight,
              image: highlight.image || "",
              title: highlight.title || "",
              label: highlight.label || "",
            })
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category, highlight]);

  return (
    <div className="mt-20">
      <MegaMenu
        fashion={category}
        subFashion={mensCategories}
        highlight={highlights}
      />
    </div>
  );
};

export default HighLightSection;
