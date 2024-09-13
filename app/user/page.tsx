"use client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ProfileImage } from "@/public/";
import { InputField } from "@/feature/auth";
import { Disaster, UserDisaster, UserStatus } from "@/types/disaster";
import SelectField from "@/feature/auth/components/SelectField";
import useApi from "@/hooks/useApi";

// デモデータ
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

function sortListByFunction(list: any[], func: { (user: any): any; (user: any): any; (arg0: any): any; }) {
  if(list&&list.length>0){
    return list.sort((a, b) => {
      const valueA = func(a);
      const valueB = func(b);
      
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }else{
    return list
  }
}

const ProfileScreen = () => {
  const user_id = "988ad7ee-03f2-4b4c-a1c8-8bea6eed5d18"
  const not_disaster_id = "8d4a75b7-9585-435a-8cc2-e760f4b1785e"

  const [disasters, setDisasters] = useState([]);
  const getDisasterListAPI = useApi();
  useEffect(() => {
    getDisasterListAPI.refetch('/disasters/', {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': true,
        }
    });
  }, [getDisasterListAPI.refetch])
  useEffect(() => {
      handleDisasters(getDisasterListAPI.data);
  }, [getDisasterListAPI.data]) 
  
  const handleDisasters = (data)=>{
    data =  sortListByFunction(data, (recipe)=>-(new Date(recipe.created_at)).getTime())
    setDisasters(data)
    console.log(disasters)
  }
  // 現在の被災状況の取得
  const getCurrentDisasterAPI = useApi();
  useEffect(()=>{
    getCurrentDisasterAPI.refetch(`/disasters/user-status/${user_id}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': true,
        }
    });
  }, [getCurrentDisasterAPI.refetch]);
  useEffect(() => {
    setCurrentDisasters(getCurrentDisasterAPI.data);
    console.log(getCurrentDisasterAPI.data)
  }, [getCurrentDisasterAPI.data]) 

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

  const setCurrentDisasters = (value: any[]) => {
    if(value && value.length>0){
      const currentValue = value[0];
      setUser((prevUser) => ({
        ...prevUser,
        user_disaster: {
          user_id: user_id,
          disaster_id: currentValue.disaster_id,
          status: currentValue.status
        }
      }))
    }
  }

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

  function onClickSaveButton(){
    console.log("save");
    if(user.user_disaster != null){
      updateUserDisaster(user.user_disaster.user_id, user.user_disaster.disaster_id, "SAFE")
    }
    console.log(disasters)
  }

  const disasterPostAPI = useApi();
  const updateUserDisaster = useCallback((user_id: string, disaster_id: string, status: string)=>{
    disasterPostAPI.refetch("/disasters/user-status", {
      method: "POST",
      headers: {
        'ngrok-skip-browser-warning': true,
    },
      data: new URLSearchParams({ user_id, disaster_id, status})
    })
  }, [disasterPostAPI.refetch]);

  useEffect(() => {
    console.log("-----------------")
    console.log("-----------------")
    console.log(disasters)
    
    console.log("-----------------")
  }, [disasters])
  

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
        {
        (<div className="mb-8">
          <label className="font-bold ">被災情報</label>
          <SelectField 
            label={"被災されている災害を選択してください？"} 
            value={user.user_disaster?.disaster_id ?? "404 (Not Found)"} 
            onChange={selectDisaster} 
            options={(disasters && disasters.length>0)?disasters.map((disaster)=>({value: disaster.disaster_id, label: disaster.description})):[{value: not_disaster_id, label:"災害情報を取得中"}]} 
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
            disabled={user.user_disaster?.disaster_id == not_disaster_id || user.user_disaster == null} 
            id={""}            
          />
        </div>)}

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
        onClick={onClickSaveButton}
      >
        保存
      </button>
    </div>
  );
};

export default ProfileScreen;
