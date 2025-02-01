import AxiosPublic from "@/services/axios-public";

const GetFeaturedProducts = async () => {
  
  const axiosPublic = AxiosPublic();
  const res = await axiosPublic.get("/featured-products");

  return res.data;
};

export default GetFeaturedProducts;
