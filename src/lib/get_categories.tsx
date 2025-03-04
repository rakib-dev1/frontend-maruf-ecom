import AxiosPublic from "@/services/axios-public";

const GetCategories = async (category?: string) => {
  const axiosPublic = AxiosPublic();
  console.log("Fetching categories for:", category);

  const url = category
    ? `/categories?category=${encodeURIComponent(category)}`
    : "/categories";

  try {
    const res = await axiosPublic.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null; // Return null or handle errors gracefully
  }
};
export default GetCategories;
