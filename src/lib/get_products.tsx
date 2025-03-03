import AxiosPublic from "@/services/axios-public";

const GetProducts = async () => {
  const axiosPublic = AxiosPublic();
  try {
    const res = await axiosPublic.get("/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Return null or handle the error properly
  }
};

export default GetProducts;
