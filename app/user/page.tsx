"use client";
import { useState } from "react";
import Image from "next/image";
import { ProfileImage } from "@/public/";
import { InputField } from "@/feature/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: "楽天太郎",
    image: ProfileImage,
    email: "rakutentaro@example.com",
    phone: "090-1234-5678",
    address: "東京都新宿区",
    isAffected: "",
    disaster: "",
    currentCondition: "",
    cookingTools: "",
    allergies: "",
    otherDishes: "",
  });

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb- 4 flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <Image
              src={user.image}
              alt="Profile Picture"
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="sr-only">Profile</h1>
            <label className="text-2xl font-bold">{user.name}</label>
          </div>
        </div>
        <div className="mb-8">
          <label className="font-bold">基本情報</label>
          <InputField
            label="Name"
            placeholder="Name"
            id="name"
            type="text"
            value={user.name}
            onChange={handleInputChange}
          />
          <InputField
            label="Email"
            placeholder="Email"
            id="email"
            type="text"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-8">
          <label className="font-bold ">被災情報</label>
          <InputField
            label="現在の被災していますか？"
            placeholder="被災しているか？"
            id="isAffected"
            type="text"
            value={user.isAffected}
            onChange={handleInputChange}
          />
          <InputField
            label="被災した災害"
            placeholder="被災した災害"
            id="disaster"
            type="text"
            value={user.disaster}
            onChange={handleInputChange}
          />
          <InputField
            label="現在の被災条件"
            placeholder="現在の被災条件"
            id="currentCondition"
            type="text"
            value={user.currentCondition}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-8">
          <label className="font-bold ">レシピのフィルター設定</label>
          <InputField
            label="手持ちの調理器具の登録"
            placeholder="調理器具の登録"
            id="cookingTools"
            type="text"
            value={user.cookingTools}
            onChange={handleInputChange}
          />
          <InputField
            label="アレルギーありますか？"
            placeholder="アレルギー"
            id="allergies"
            type="text"
            value={user.allergies}
            onChange={handleInputChange}
          />
          <InputField
            label="その他の食べられない料理"
            placeholder="食べられない料理"
            id="otherDishes"
            type="text"
            value={user.otherDishes}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        className="w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        保存
      </button>
    </div>
  );
};

export default ProfileScreen;
