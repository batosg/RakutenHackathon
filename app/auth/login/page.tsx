"use client";
import React from "react";
import { LogoImage } from "@/public/";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { InputField, useLogin } from "@/feature/auth";

const LoginPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  } = useLogin();

  const router = useRouter();
  const handleRegister = () => {
    router.push("/auth/register");
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Image
        className="mt-24"
        src={LogoImage}
        alt="logo"
        width={100}
        height={100}
      />
      <div className="mt-24 px-10">
        <h1 className="text-xl font-bold text-center">ログイン</h1>
        <form onSubmit={handleLogin}>
          <div className="mt-10">
            <div className="mb-6">
              <InputField
                label="メールアドレス"
                placeholder="メールアドレス"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <InputField
                label="パスワード"
                placeholder="パスワード"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
            <button
              className="w-full bg-white border border-accent text-accent font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              会員登録
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
