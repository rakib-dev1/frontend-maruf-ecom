import AxiosPublic from "@/services/axios-public";

const GetProducts = async (category = "", subcategory = "") => {
  const axiosPublic = AxiosPublic();
  try {
    const query = new URLSearchParams();

    if (category) query.append("category", category);
    if (subcategory) query.append("subcategory", subcategory);

    const url = query.toString()
      ? `/products?${query.toString()}`
      : "/products";
    const response = await axiosPublic.get(url);

    return response.data; // Return fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array on error
  }
};

export default GetProducts;
