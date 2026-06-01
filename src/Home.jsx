
import GameBox from "./GameBox";
import NumberGame from "./NumberGame";

function Home() {
  return (
    <div className="flex flex-col  gap-5 min-h-screen bg-gray-100 p-5">
        <div className="grid grid-cols-4 gap-10 bg-gray-100 max-md:grid-cols-2 max-sm:grid-cols-1">
            <a href="/number-game" className="h-auto"><GameBox image="Number-Game.png" title="Number Game" /></a>
            <a href="/simon-says" className="h-auto"><GameBox image="SimonSays.png" title="Simon Says Game" /></a>
            {/* <a href="/number-game" className="h-auto"><GameBox image="Number-Game.png" title="Number Game" /></a> */}
        </div>
    </div>
  );
}

export default Home;