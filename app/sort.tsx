import Image from "next/image";

function sortListByFunction(list: any[], func: { (user: any): any; (user: any): any; (arg0: any): any; }) {
  return list.sort((a, b) => {
    const valueA = func(a);
    const valueB = func(b);
    
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
}

export default function Home() {
  const users = [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "Alice Johnson", age: 28 },
    { name: "Bob Brown", age: 35 }
  ];

  // 西村くんここに配列作ってソートできる仕組みを作って欲しい！

  const sortedByNameLength = sortListByFunction([...users], user => user.name.length);

  const sortedByAge = sortListByFunction([...users], user=> user.age);

  return (
    <div>
      <h1>名前の文字数順</h1>
      <ul>
        {sortedByNameLength.map((user, index) => (
          <li key={index}>
            {user.name} ({user.name.length}文字)
          </li>
        ))}
      </ul>

      <h1>年齢順</h1>
      <ul>
        {sortedByAge.map((user, index) => (
          <li key={index}>
            {user.name} - {user.age}歳
          </li>
        ))}
      </ul>
    </div>
  );
}
