import AxiosPublic from "@/services/axios-public";

const GetCategories = async (category?: string) => {
  const axiosPublic = AxiosPublic();
  const url = category
    ? `/categories?category=${encodeURIComponent(category)}`
    : "/categories";
  const res = await axiosPublic.get(url);
  return res.data;
};
export default GetCategories;
