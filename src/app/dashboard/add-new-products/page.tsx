"use client";
import ImageUpload from "@/components/admin/shared/image_uploader/image_uploader";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GetCategories from "@/lib/get_categories";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import AxiosPublic from "@/services/axios-public";
import toast, { Toaster } from "react-hot-toast";
interface Category {
  _id: string;
  label: string;
  subcategories: { href: string; label: string }[];
}
type Inputs = {
  price: string;
  stock: string;
  title: string;
  description: string;
  sizes: string[];
  tags: string;
  discount: string;
  images: { id: string; url: string; file?: File }[];
};
const AddNewProducts = () => {
  const axiosPublic = AxiosPublic();
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      if (loading) {
        toast.loading("Adding product...");
      }

      const categories = selectedCategory;
      const subcategories = selectedSubCategory;
      const formData = new FormData();
      if (!data.images) {
        return alert("Please upload at least one image");
      }
      // Append images to formData
      data.images?.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      // Append other product fields to formData
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categories", categories);
      formData.append("subcategories", subcategories);
      formData.append("discount", data.discount);
      formData.append("sizes", data.sizes.join(","));
      formData.append("tags", data.tags);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      // Send formData in the POST request
      const result = await axiosPublic.post("/add-products", formData);
      console.log(result);
      setLoading(false);
      if (result.status === 200) {
        toast.success("Product added successfully");
      }

      reset();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <React.Fragment>
      <h1>Add New Products</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="border p-5 rounded-lg bg-slate-50">
            <h1>General Information:</h1>
            <Input
              className="my-1"
              placeholder="Product Name"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">The title is required</span>
            )}

            <Textarea
              className="my-1"
              placeholder="Product Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">The description is required</span>
            )}

            <div className="mt-5">
              {/* size */}
              <h1>Size:</h1>
              <div className="flex gap-3 ">
                <div className="flex flex-wrap gap-2">
                  {["SS", "S", "M", "L", "XL", "2XL"].map((size) => (
                    <Controller
                      key={size}
                      name="sizes"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={size}
                            checked={field.value.includes(size)}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked
                                  ? [...field.value, size]
                                  : field.value.filter(
                                      (s: string) => s !== size
                                    )
                              )
                            }
                          />
                          <label
                            htmlFor={size}
                            className="text-sm font-medium leading-none"
                          >
                            {size}
                          </label>
                        </div>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* end size */}

            <div className="grid grid-cols-2 gap-3 mt-5 ">
              <div className="grid grid-row-2 gap-3 ">
                <div>
                  <h1>Categories:</h1>
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Main Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Categories</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category.label}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  {selectedCategory && (
                    <Select
                      onValueChange={(value) => setSelectedSubCategory(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Sub Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Sub Categories</SelectLabel>
                          {categories
                            .find((c) => c.label === selectedCategory)
                            ?.subcategories?.map((subCategory) => (
                              <SelectItem
                                key={subCategory.href}
                                value={subCategory.label}
                              >
                                {subCategory.label}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              <div>
                <h1>Tags</h1>
                <Input
                  className="my-1"
                  placeholder="Tags"
                  {...register("tags", { required: true })}
                />
                {errors.tags && (
                  <span className="text-red-500">The tags is required</span>
                )}
                <label className="text-xs text-gray-500">
                  Separate tags with commas, e.g. red, blue, green
                </label>
              </div>
            </div>
          </div>
          <div>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUpload value={field.value} onChange={field.onChange} />
              )}
            />

            {loading && <progress max="100" value="70"></progress>}

            <div className="flex">
              <Button type="submit" className="">
                Add Product
              </Button>
            </div>
          </div>

          <div className="border p-5 rounded-lg bg-slate-50">
            <h1>Pricing And Stock</h1>
            <div className="grid grid-cols-2 gap-3 ">
              <Input
                type="number"
                className="my-1"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              <Input
                type="number"
                className="my-1"
                placeholder="Stock"
                {...register("stock", { required: true })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <Input
                type="number"
                className="my-1"
                placeholder="Discount"
                {...register("discount", { required: true })}
              />
            </div>
          </div>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </React.Fragment>
  );
};

export default AddNewProducts;
