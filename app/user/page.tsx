"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ProfileImage } from "@/public/";
import { InputField } from "@/feature/auth";
import { Disaster, UserDisaster, UserStatus } from "@/types/disaster";
import SelectField from "@/feature/auth/components/SelectField";

// デモデータ
const user_id = "id_demo"

const DisasterDemo :Disaster[]= [
  {
    disaster_id: "a", 
    description: "中部地方で発生した震度5の地震", 
    main_affected_area: "中部地方", 
    occurrrence_date: "2024-12-31", 
    created_at:"2024-12-31", 
    updated_at: "2024-12-31"
  },  
  {
    disaster_id: "b", 
    description: "沖縄県を襲った台風23号", 
    main_affected_area: "沖縄県", 
    occurrrence_date: "2024-11-31", 
    created_at:"2024-11-31", 
    updated_at: "2024-11-31"
  },  
  {
    disaster_id: "c", 
    description: "関東都心部で発生した局地的豪雨", 
    main_affected_area: "関東都心部", 
    occurrrence_date: "2024-10-21", 
    created_at:"2024-10-21", 
    updated_at: "2024-10-1"
  }
];

interface User {
  name: string;
  image: StaticImageData;
  email: string;
  phone: string;
  address: string;
  isAffected: string;
  disaster: string;
  currentCondition: string;
  cookingTools: string;
  allergies: string;
  otherDishes: string;
  user_disaster: UserDisaster | null; // Disaster または null を許容
}

const ProfileScreen = () => {
  const [user, setUser] = useState<User>({
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
    user_disaster: null, 
  });

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const selectDisaster = (e)=>{
    const value = e.target.value
    if(value =="ImNotInDisaster"){
      setUser((prevUser) => ({
        ...prevUser,
        user_disaster: null
      }))
      
      return
    }
    const new_user_disaster = {
      user_id: user_id,
      disaster_id: value,
      status: UserStatus.Safe, //初期状態としてSafeを設定
    }
    setUser((prevUser) => ({
      ...prevUser,
      user_disaster: new_user_disaster
    }))
  }

  useEffect(() => {
    console.log(user); // userの変更を監視してログを出力
  }, [user]);
  const selectStatus: (str)=>void = (e)=>{
    if(user.user_disaster == null){
      return null
    }
    const value = e.target.value
    const new_user_disaster = {
      ...user.user_disaster,
      status: value
    }
    setUser((prevUser) => ({
      ...prevUser,
      user_disaster: new_user_disaster
    }))
  }


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
          <SelectField 
            label={"被災されている災害を選択してください？"} 
            value={user.user_disaster?.disaster_id ?? "ImNotInDisaster"} 
            onChange={selectDisaster} 
            options={[{value: "ImNotInDisaster", label:"被災していない"}, ...DisasterDemo.map((disaster)=>({value: disaster.disaster_id, label: disaster.description}))]} 
            placeholder={""}
            disabled={false} 
            id={""}            
          />
          <SelectField 
            label={"現在の被災状況"} 
            value={user.user_disaster?.status ?? ""} 
            onChange={selectStatus} 
            options={[
              {value: UserStatus.Safe, label: "避難不要"},
              {value: UserStatus.Evacuating, label: "避難中"},
              {value: UserStatus.Affected, label: "避難済み"}
            ]} 
            placeholder={""}
            disabled={user.user_disaster == null} 
            id={""}            
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
