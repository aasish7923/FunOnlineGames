
import GameBox from "./GameBox";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col  gap-5 min-h-screen bg-gray-100 p-5">
        <div className="grid grid-cols-4 gap-10 bg-gray-100 max-md:grid-cols-2 max-sm:grid-cols-1">
          <Link to="/number-game" className="h-auto"><GameBox image="Number-Game.png" title="Number Game" /></Link>
          <Link to="/simon-says" className="h-auto"><GameBox image="SimonSays.png" title="Simon Says Game" /></Link>
            {/* <a href="/number-game" className="h-auto"><GameBox image="Number-Game.png" title="Number Game" /></a> */}
        </div>
    </div>
  );
}

export default Home;