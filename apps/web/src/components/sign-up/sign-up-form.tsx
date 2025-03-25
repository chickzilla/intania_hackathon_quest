"use client";
import { signUpSchema } from "@/schema/sign-up-form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import TextField from "@mui/material/TextField/TextField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { textFieldWhiteStyle } from "@/style/text-field-mui-style";
import SignUp from "@/services/signUp";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const isDisabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isValid,
    [form.formState.isSubmitting, form.formState.isValid],
  );

  async function onSubmit() {
    const { email, password } = form.getValues();

    await SignUp({ email, password })
      .then((res) => {
        if (!res) {
          toast({
            title: "Create an account failed",
            description: res?.error,
            isError: true,
          });
        } else {
          toast({
            title: "Create an account success",
            description: "redirecting to sign in page",
            isError: false,
          });
          router.push("/auth/sign-in");
        }
      })
      .catch((e) => {
        toast({
          title: "Create an account success",
          description: "please try again",
          isError: false,
        });
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-5 flex flex-col space-y-8 items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  sx={textFieldWhiteStyle}
                  className="w-[40vw] lg:w-[20vw]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  sx={textFieldWhiteStyle}
                  className="w-[40vw] lg:w-[20vw]"
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextField
                  {...field}
                  label="Confirm Password"
                  variant="outlined"
                  sx={textFieldWhiteStyle}
                  className="w-[40vw] lg:w-[20vw]"
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          disabled={isDisabled}
          className={`text-white hover:cursor-pointer border w-[40vw] lg:w-[20vw] h-10 bg-orange-400 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 duration-75 transition`}
          onClick={onSubmit}
        >
          Sign Up
        </button>
        <div>
          <span className="text-black">Already have an account?</span>
          <span
            className="hover:cursor-pointer text-orange-400 ml-3"
            onClick={() => router.push("/auth/sign-in")}
          >
            Sign In
          </span>
        </div>
      </form>
    </Form>
  );
}
