import AxiosPublic from "@/services/axios-public";

const GetHightLights = async ({ category }: { category: string }) => {
  const axiosPublic = AxiosPublic();
  console.log("Fetching highlights for:", category);

  const url = category
    ? `/highlights?category=${encodeURIComponent(category)}`
    : "/highlights";
  const res = await axiosPublic.get(url);
  return res.data;
};

export default GetHightLights;
