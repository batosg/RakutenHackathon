import { GassConlo } from "@/public";
import Image from "next/image";


const image = <Image className="w-[90vw] mx-auto" src={GassConlo} alt="ガスコンロ" />;
const title = (text:string) => <h1 className="text-lg font-bold mb-4 ">{text}</h1>;
const baseText = (text:string) => <div className="mb-4 text-left text-sm">{text}</div>;
const heading = (text:string) => <h1 className="text-1xl mb-4 relative inline-block text-base">{text}<span className="absolute left-0 bottom-0 w-1/4 h-1 bg-red-500"></span></h1>;
const middleHeading = (text:string) => <div className="mb-4s text-left text-sm font-bold">{text}</div>;

const context = <div className = "m-10 mx-left">
    {title("【ガスが止まった時に】火を使わない調理法／節ガス・節水になるポリ袋調理法")}
    {baseText("地震や大型台風などの災害によって「ガス」が使えなくなったときにできる調理の工夫と、節ガス・節水になる「ポリ袋調理」について解説します。")}
    
    {heading("ガスが使えないときにできる調理の工夫")}
    {middleHeading("カセットコンロを使う")}
    {baseText("ガスが使えないときの代わりの熱源として、あると役立つのがカセットコンロです。ただし、ガスボンベの燃焼時間には限りがあるので、 加熱するものに優先順位をつけて、効率的に使うよう心がけましょう。コンロを2台並べたり、ストーブのそばで使用したりするのは危険なので避けてください。「カセットコンロの正しい使い方」も確認してください。")}
    {middleHeading("乾物や缶詰にアレンジを加える")}
    {baseText("レトルト食品や缶詰はそのまま食べられるのがいいところですが、毎食、加工品ばかりだと飽きがちです。そんなときはひと手間加えて、味つけをアレンジしてみましょう。ガスや電気を使わなくても、乾物を調味料とあえたり、食材を缶詰にのせたりするだけで、立派なおかずになります。手づくりの料理があると、減退しがちな食欲も回復します。")}
    {middleHeading("電気が使える場合の熱源")}
    {baseText("災害時に必ずしもすべてのライフラインが止まるわけではありません。電気が使える環境であれば、ガスの代わりに 電子レンジや炊飯器、ホットプレートなどを活用し、普段と変わらない食事を楽しめます。")}

    {heading("制限のある環境下で役立つ「ポリ袋調理」")}
    {baseText("ポリ袋調理は、災害時の制限ある環境下で役立つ調理法です。基本は食材を入れて、湯せんにかけるだけですが、 いくつかポイントがあります。")}
    {middleHeading("1. ポリ袋に食材と調味料を入れる")}
    {baseText("深めの器などにポリ袋をかぶせてから食材を入れます。こぼれる心配がなく、特に水などの液体を加えるときは安心です。もちろんポリ袋にそのまま食材を入れても問題ありません。")}
    {middleHeading("2. 手でもんで混ぜる")}
    {baseText("あえたり、味をなじませたり、こねたりといった作業をポリ袋をもんで行います。ボウルや泡立て器などの調理器具がなくても大丈夫です。")}
    {middleHeading("3. 空気を抜いて上の方で口を結ぶ")}
    {baseText("加熱すると空気が膨張し、破裂する可能性があるので、空気が入らないようねじり上げ、 袋の上部でかたく結びます（結んだあとは、 ねじれが戻ってもOK）。")}
    {middleHeading("4. 鍋に水をはり、耐熱皿を敷く")}
    {baseText("ポリ袋が鍋底に直接当たると、熱で破れる可能性があるので、水を入れて耐熱皿を敷いておきます。")}
    {middleHeading("5. 鍋にポリ袋を入れて加熱する")}
    {baseText("食材の入ったポリ袋を、水の状態から入れます。鍋に湯を沸かしてから入れてもいいですが、水からの方がエネルギーを効率的に使うことができます。加熱中はなるべくフタをして、蒸発を防いでください。")}
    {middleHeading("6. トングなどで取り出して、器に盛る")}
    {baseText("火がとおったら、トングや菜箸で袋をすくい上げます。結び目の下をハサミで切り、器に移し替えるか、もしくはそのままポリ袋を器にかぶせて食卓に出しましょう。")}
</div>;

const Tips = () => {
    return (
        <div>
            {image}
            {context}
        </div>
    );
};


export default Tips;
