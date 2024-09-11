import Image from "next/image";
import { TakikomiImage} from "@/public/"
import { ProfileImage} from "@/public/"
import Link from "next/link";
export default function Recipe() {


  return (
    <div>
    {/*Header*/}
    <div>
      <input type="text" id="name" name="name" value="材料、道具、料理名で検索" />
      
    </div>

    <div className="text-s pl-6 pt-10">
        <p>
            簡単に出来る炊き込みご飯 レシピ・作り方・tips
        </p>
    </div>
    <div className="flex justify-center my-4">
      <Image src={TakikomiImage} width={340} height={300}  />
    </div>
    <div className="flex justyfy-center items-center">
        <p className="bg-red-500 text-white text-center mx-10 my-5 w-full rounded-lg hover:opacity-30"> レシピをダウンロードをする </p>
    </div> 

    {/*プロフィールパート*/}
    <div className="flex mx-4">
        <Image src={ProfileImage} width={50} height={50}  />
        <div className="flex justify-between items-center w-full mx-3 ">
            <h3 className="text-left hover:opacity-30">Rakuten Taro</h3>
            <h3 className="bg-green-300 text-white text-center w-1/2 hover:opacity-30">フォローする</h3>
        </div>
    </div>
    {/*作った数パート*/}
    <div className="flex justyfy-center items-center pt-5 w-full ">
        <p className="bg-gray-500 text-white text-center px-6 py-2 w-full mx-6"> みんなが作った数 <span className="text-red-500 font-bold">X</span>件 </p>
    </div>

    {/*材料パート*/}
    <div className="mx-6 my-7">
      <p className="text-xl ">材料(約Y人分)</p>
      <ul className="my-4">
        <li>
          <div className="flex justify-between border-b-2 border-gray-500 ">
            <p>米</p>
            <p>300g</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>人参</p>
            <p>二個</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>えのき</p>
            <p>2パック</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>だし</p>
            <p>適量</p>
          </div>
          </li>
      </ul>
    </div>
    {/*道具パート*/}
    <div className="mx-6 my-7">
      <p className="text-xl ">道具</p>
      <ul className="my-4">
        <li>
          <div className="flex justify-between border-b-2 border-gray-500 ">
            <p>炊飯器</p>
            <p>1台</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>包丁</p>
            <p>1丁</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>ピーラー</p>
            <p>1つ</p>
          </div>
          </li>
          <li>
          <div className="flex justify-between border-b-2 border-gray-500 pt-5">
            <p>ボール</p>
            <p>1つ</p>
          </div>
          </li>
      </ul>
    </div>
    {/*作り方パート*/}
    <div className="mx-6 my-7">
      <p className="text-xl ">作り方</p>
      <ol className="my-4 list-decimal list-inside">
        <li  className="mb-4">
          人参の皮をピーラーで剥き、包丁で千切りする
          </li>
        <li className="mb-4">
          えのきを手で分け、1. で作成したものとともにボールに入れる
        </li>
        <li className="mb-4">
          米を研ぎ、炊飯器に具材と米、そしてダシを入れ炊く
        </li>
      </ol>
    </div>
    {/*tip パート*/}
    <div className="mx-6 my-7">
      <p className="text-xl pb-5">tips</p>
      <div className="flex w-full overflow-x-scroll space-x-4 flex-nowrap pb-4">
        <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
        ポリ袋でご飯を炊く方法
        </div>
      <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
        ピーラーいらずで皮をむく方法
      </div>
      <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
        ポリ袋でご飯を研ぐ方法
      </div>
      <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
        アイテム4
      </div>
      <div className="w-[160px] h-[128px] bg-gray-400 text-white flex items-center justify-center flex-shrink-0 text-center">
        アイテム5
      </div>
      </div>
    </div>

    {/*キーワードを投稿*/}
    <div className="mx-6">
      <p className="text-m pb-4">キーワードタグ</p>
      <ul className="flex justify-between">
        <li>
          <p className="text-blue-400"> # 地震・津波</p>
        </li>
        <li>
          <p className="text-blue-400"> # 炊き込みご飯</p>
        </li>
        <li>
          <p className="text-blue-400"> # 皮の剥き方</p>
        </li>
      </ul>
    </div>

    {/*レビューパート*/ }
    <div className="bg-gray-400 my-4 mx-6  items-center text-center hover:opacity-30 rounded-lg ">
      <Link href="../reviews">レビューを投稿する</Link>
    </div>
    </div>
  )


}