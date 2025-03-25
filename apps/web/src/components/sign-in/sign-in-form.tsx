"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import TextField from "@mui/material/TextField/TextField";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { textFieldWhiteStyle } from "@/style/text-field-mui-style";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schema/sign-in-form-schema";
import SignIn from "@/services/signIn";
import { setItemToLocalStorage } from "@/lib/localstorage";

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const isDisabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isValid,
    [form.formState.isSubmitting, form.formState.isValid],
  );

  async function onSubmit() {
    const { email, password } = form.getValues();

    await SignIn({ email, password })
      .then((jwt) => {
        if (!jwt) {
          toast({
            title: "Cannot sign in",
            description: "Please check your email and password",
            isError: true,
          });
        } else {
          localStorage.setItem("jwt", jwt);
          toast({
            title: "Login success",
            description: "Welcome back",
            isError: false,
          });

          window.location.href = "/board/text";
        }
      })
      .catch(() => {
        toast({
          title: "Cannot sign in",
          description: "Please check your email and password",
          isError: true,
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
        <button
          disabled={isDisabled}
          className={`text-white hover:cursor-pointer border w-[40vw] lg:w-[20vw] h-10 bg-orange-400 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 duration-75 transition`}
          onClick={onSubmit}
        >
          Sign In
        </button>
        <div>
          <span className="text-black">Don't have an account?</span>
          <span
            className="hover:cursor-pointer text-orange-400 ml-3"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </Form>
  );
}
