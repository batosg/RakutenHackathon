import Image from "next/image";
import { TakikomiImage} from "@/public/"
import { ProfileImage} from "@/public/"
export default function Recipe() {


  return (
    <div>
     
    <div>
      <input type="text" id="name" name="name" value="材料、道具、料理名で検索" />
      
    </div>

    <div>
        <p1>
            簡単に出来る炊き込みご飯 レシピ・作り方・tips
        </p1>
        <Image src={TakikomiImage} width={300} height={400} />
    </div>

    <div className="flex justyfy-center items-center">
        <p1 className="bg-red-500 text-white text-center mx-auto p-4 w-1/2"> レシピをダウンロードをする </p1>
    </div>


    <div className="flex mx-4">
        <Image src={ProfileImage} width={50} height={50} />
        <div className="flex justify-between items-center w-full mx-auto">
            <h3 className="text-left">Rakuten Taro</h3>
            <h3 className="bg-green-500 text-white text-left px-4 py-2">フォローする</h3>
        </div>
    </div>

    <div className="flex justyfy-center items-center">
        <p1 className="bg-gray-500 text-white text-center mx-auto px-6 py-2 w-1/2"> みんなが作った数 <span className="text-red-500 font-bold">X</span>件 </p1>
    </div>

    </div>
  )


}