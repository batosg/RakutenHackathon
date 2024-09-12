import React, { useState } from "react";

const ReviewCriteria = () => {
  const [difficulty, setDifficulty] = useState(1);
  const [acc, setAcc] = useState(1);
  const [stor, setStor] = useState(1);
  const [eat, setEat] = useState(1);

  const criteria = [
    {
      label: "料理の難易度",
      value: difficulty,
      setter: setDifficulty,
    },
    {
      label: "材料の入手のしやすさ",
      value: acc,
      setter: setAcc,
    },
    {
      label: "長期保存のしやすさ",
      value: stor,
      setter: setStor,
    },
    {
      label: "もう一度食べたいと思いますか？",
      value: eat,
      setter: setEat,
    },
  ];

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      {criteria.map(({ label, value, setter }, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <label className="text-lg font-semibold">{label}</label>
          <div className="flex space-x-6">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                onClick={() => setter(level)}
                className={`cursor-pointer text-lg font-bold px-3 py-1 rounded ${
                  level === value ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCriteria;
