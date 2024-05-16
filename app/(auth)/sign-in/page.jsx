"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);
  const [loader, setLoader] = useState(false);

  function onSignin() {
    setLoader(true);
    GlobalApi.Signin(email, password).then(
      (resp) => {
        console.log(resp.data.user);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Logged in Successfully!");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center p-10 justify-center bg-slate-100 border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign in to Account</h2>
        <h2 className="text-gray-500">
          Enter you Email and Password to Sign in to Account
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            name="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignin()} disabled={!(email && password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : " Sign in"}
          </Button>
          <p>
            Don't have an account
            <Link href={"/create-account"} className="text-blue-500">
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
