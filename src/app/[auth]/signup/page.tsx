"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "@/components/client-components/social_login/social_login";
import Link from "next/link";
type Inputs = {
  email: string;
  password: string;
};

const SignupPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [showPassword, setShowPassword] = React.useState(false);
  const password = watch("password", "");
  const getStrength = (password: string | unknown[]) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password as string)) strength++;
    if (/[a-z]/.test(password as string)) strength++;
    if (/\d/.test(password as string)) strength++;
    if (/[^A-Za-z0-9]/.test(password as string)) strength++;

    // Strength meter classification
    const strengthLevels = [
      { color: "bg-red-500", width: "w-1/5", text: "Very Weak" },
      { color: "bg-orange-500", width: "w-2/5", text: "Weak" },
      { color: "bg-yellow-500", width: "w-3/5", text: "Moderate" },
      { color: "bg-green-500", width: "w-4/5", text: "Strong" },
      { color: "bg-blue-500", width: "w-full", text: "Very Strong" },
    ];

    return strengthLevels[strength] || strengthLevels[0]; // Default to weakest if no strength
  };

  const strength = getStrength(password);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(
        "https://server-maruf-ecom.vercel.app/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const responseData = await res.json();

      if (!res.ok) {
        console.log(responseData.message || "Signup failed");
      }

      toast.success("Signup successful! Redirecting...");

      //   Optional: Automatically sign in after signup
      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error(error);
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <React.Fragment>
      <div className="mx-auto w-full lg:w-1/2 lg:my-20">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create an Account</h1>
                  <p className="text-muted-foreground">
                    Sign up to get started
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="grid gap-2 relative">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      required
                      className="pr-10 w-full p-2 border rounded"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Error message */}
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}

                  {/* Password Strength Meter */}
                  {password && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <SocialLogin />
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Toaster position="top-right" />
      </div>
    </React.Fragment>
  );
};

export default SignupPage;
