"use client";
import Image from "next/image";
import { useState } from 'react';
import { TakikomiImage } from "@/public/"
import { ProfileImage } from "@/public/"
import { KatsuCurry } from "@/public/"
import Link from "next/link";


export default function Home() {
  const [isCuisineOpen, setIsCuisineOpen] = useState(true); // 料理のプルダウン用
  const [isThemeOpen, setIsThemeOpen] = useState(true); // テーマのプルダウン用
  const [isGoodsOpen, setIsGoodsOpen] = useState(true); // 調理方法のプルダウン用
  // ボタンのラベルを配列で管理
  const labels = ['鍋', 'コンロ', 'フライパン', 'オーブン', '電子レンジ', 'トースター'];

  // 各ボタンの状態を配列で管理
  const [buttonStates, setButtonStates] = useState(Array(labels.length).fill(false));

  const toggleColor = (index) => {
    const newStates = [...buttonStates];
    newStates[index] = !newStates[index]; // クリックしたボタンの状態をトグル
    setButtonStates(newStates);
  };
  const toggleCuisine = () => {
    setIsCuisineOpen(!isCuisineOpen);
    // setIsThemeOpen(false);
    // setIsGoodsOpen(false); // 他のメニューが開かないように
  };

  const toggleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
    // setIsCuisineOpen(false);
    // setIsGoodsOpen(false); // 他のメニューが開かないように
  };

  const toggleGoods = () => {
    setIsGoodsOpen(!isGoodsOpen);
    // setIsCuisineOpen(false);
    // setIsThemeOpen(false); // 他のメニューが開かないように
  };
  return (
    <div>
      <div>
        <input type="text" id="name" name="name" value="材料、道具、料理名で検索" />
      </div>

      {/*本日のおすすめパート*/}
      <div className="my-8  py-2 rounded-xl font-bold">
        <div className="text-xl pl-6 pt-2">
          <p>今日のPick upレシピ</p>
        </div>
        <div className="flex justify-center my-4">
          <Image src={KatsuCurry} width={440} height={330} />
        </div>
      </div>

      {/*定番レシピカテゴリパート*/}
      <div>
        <p className="text-xl font-bold mx-6 mt-10 mb-5">定番レシピカテゴリ</p>
      </div>

      {/*料理 プルダウンメニューパート*/}
      <div className="relative inline-block w-full px-6">
        <button
          onClick={toggleCuisine}
          className="w-full py-2 bg-gray-300 text-black font-bold rounded-md flex justify-between items-center px-6"
        >
          料理
          <span className="text-lg">{isCuisineOpen ? '⌃' : '⌄'}</span>
        </button>

        {isCuisineOpen && (
          <div className="w-full bg-gray-100 rounded-md shadow-lg mt-2">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">和食</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">洋食</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">中華</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">韓国料理</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">イタリアン</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">その他</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*テーマ プルダウンメニューパート*/}
      <div className="relative inline-block w-full px-6">
        <button
          onClick={toggleTheme}
          className="w-full py-2 bg-gray-300 text-black font-bold rounded-md flex justify-between items-center px-6"
        >
          テーマ
          <span className="text-lg">{isThemeOpen ? '⌃' : '⌄'}</span>
        </button>

        {isThemeOpen && (
          <div className="w-full bg-gray-100 rounded-md shadow-lg mt-2">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">保存食</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">簡単レシピ</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">tipsレシピ</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">その他</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*調理方法 プルダウンメニュー方法*/}
      <div className="relative inline-block w-full px-6">
        <button
          onClick={toggleGoods}
          className="w-full py-2 bg-gray-300 text-black font-bold rounded-md flex justify-between items-center px-6"
        >
          調理方法
          <span className="text-lg">{isGoodsOpen ? '⌃' : '⌄'}</span>
        </button>

        {isGoodsOpen && (
          <div className="w-full bg-gray-100 rounded-md shadow-lg mt-2">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">ガスコンロ</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">焚火</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">火未使用</div>
              </div>
              <div className="flex items-center border-b border-gray-300 p-2">
                <div className="w-12 h-12 bg-gray-400"></div>
                <div className="ml-2 text-black font-bold">その他</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/*お手持ちの調理器具から検索パート*/}
      <div className="w-full px-6">
        <div className="w-full text-xl pt-7 pb-3 font-bold">
          <p>お手持ちの調理器具から検索</p>
        </div>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value="検索"
            className="bg-gray-300 w-full p-2  text-sm"
          />
        </div>
      </div>

      {/*調理器具の選択ボタンパート*/}
      <div className="grid grid-cols-3 gap-2 p-2 mx-6">
        {/* <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">鍋</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">カセットコンロ</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">やかん</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">フライパン</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">まな板</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">包丁</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">菜箸</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">ピーラー</button>
        <button className="bg-gray-300 text-white py-1 px-1 rounded-md focus:bg-red-500 transition duration-300">その他</button> */}
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => toggleColor(index)}
            className={`${buttonStates[index] ? 'bg-red-500' : 'bg-gray-400'} text-white py-2 px-4 rounded-md transition duration-300`}
          >
            {label}
          </button>
        ))}
      </div>
      {/*災害時のお役立ち情報 パート*/}
      <div className="mx-6 my-7">
        <p className="text-xl pb-5 font-bold">災害時のお役立ち情報</p>
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
    </div>
  );
}
