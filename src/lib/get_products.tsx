import AxiosPublic from "@/services/axios-public";

const GetProducts = async (category?: string, subCategory?: string) => {
  console.log("Fetching products for:", { category, subCategory });

  const axiosPublic = AxiosPublic();
  let url = "/products"; // Default endpoint

  if (category && subCategory) {
    url += `?category=${encodeURIComponent(
      category
    )}&subCategory=${encodeURIComponent(subCategory)}`;
  } else if (category) {
    url += `?category=${encodeURIComponent(category)}`;
  } else if (subCategory) {
    url += `?subCategory=${encodeURIComponent(subCategory)}`;
  }

  try {
    const res = await axiosPublic.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export default GetProducts;
