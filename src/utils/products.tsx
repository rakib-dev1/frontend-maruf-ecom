import AxiosPublic from "@/services/axios-public";

const GetProducts = async ({ category, subcategory, title }) => {
  const axiosPublic = AxiosPublic();
  try {
    const res = await axiosPublic.get(
      `/products?category=${category}&subcategory=${subcategory}&title=${title}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export default GetProducts;
