import { useState, useEffect } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SimonSays() {
  const [arr, setArr] = useState([]);
  const [level, setLevel] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedNumbers, setClickedNumbers] = useState([]);
  const [isHardMode, setIsHardMode] = useState(false);
  const [play, setPlay] = useState(false);

  const mainArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bestNormalLevel = localStorage.getItem("bestNormalLevel") || 0;
  const bestHardLevel = localStorage.getItem("bestHardLevel") || 0;

  useEffect(() => {
    if (level !== null) {
      const leng = level + 2;
      const a = Array.from(
        { length: leng },
        () => Math.floor(Math.random() * 9) + 1,
      );
      setArr(a);

      const playSequence = async (sequence) => {
        setIsPlaying(true);
        await wait(300);
        if (isHardMode) {
          for (let i = 0; i < sequence.length; i++) {
            setHighlightedIndex(i);
            await wait(100);
            setHighlightedIndex(null);
            await wait(100);
          }
          setIsPlaying(false);
        } else {
          for (let i = 0; i < sequence.length; i++) {
            setHighlightedIndex(i);
            await wait(200);
            setHighlightedIndex(null);
            await wait(100);
          }
          setIsPlaying(false);
        }
      };

      playSequence(a);
    }
  }, [level, play]);

  function handleClick(num) {
    const currentIndex = clickedNumbers.length;
    if (isPlaying || currentIndex >= arr.length) return;

    if (num !== arr[currentIndex]) {
      alert("You messed up!");
      if (isHardMode) {
        localStorage.setItem("bestHardLevel", level);
      } else {
        localStorage.setItem("bestNormalLevel", level);
      }
      return;
    }
    const newClickedNumbers = [...clickedNumbers, num];
    console.log(newClickedNumbers);
    setClickedNumbers(newClickedNumbers);

    if (newClickedNumbers.length === arr.length) {
      setTimeout(() => {
        alert("Level Complete!");
        setLevel(level + 1);
        if (isHardMode) {
          if (level > bestHardLevel) {
            localStorage.setItem("bestHardLevel", level);
          }
        } else {
          if (level > bestNormalLevel) {
            localStorage.setItem("bestNormalLevel", level);
          }
        }
        setClickedNumbers([]);
      }, 500);
    }
  }

  function onStart() {
    if (isHardMode) {
      setLevel(bestHardLevel > 0 ? parseInt(bestHardLevel) : 1);
    } else {
      setLevel(bestNormalLevel > 0 ? parseInt(bestNormalLevel) : 1);
    }
    setClickedNumbers([]);
    setPlay(!play);  
  }

  function toggleMode() {
    setIsHardMode(!isHardMode);
    setLevel(null);
    setClickedNumbers([]);
  }

  function confirmRestart(){
    if(window.confirm("Are you sure you want to restart the game? Your current progress will be lost.")){
      setLevel(1);
      setClickedNumbers([]);
    }
  }


// bg-[#F3F4F6]
  return (
    <div className={`h-screen w-full flex flex-col justify-between items-center
                    ${isHardMode ? "bg-[#40199a] text-white" : "bg-[#8bf482] text-black"}
                    transition-colors duration-500`}>
      <div className="text-center p-5">
        <h2 className="text-3xl font-bold">Simon Says</h2>

        <div className="flex gap-1 justify-center items-center relative h-12">
            <button
              onClick={toggleMode}
              className={`
            absolute font-bold text-5 cursor-pointer whitespace-nowrap
            transition-all duration-500 ease-in-out transform
            ${
              !isHardMode
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            } 
          `}
            >
              ◂ Normal Mode
            </button>

            <button
              onClick={toggleMode}
              className={`
            absolute font-bold text-5 cursor-pointer whitespace-nowrap
            transition-all duration-500 ease-in-out transform
            ${
              isHardMode
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            } 
          `}
            >
              Hard Mode ▸
            </button>
        </div>
      </div>
      <div className="flex flex-col w-fit">
        <div className="flex justify-between">
          {level !== null ? (
            <p className="font-medium text-5">Level: {level}</p>
          ) : (
            <p></p>
          )}
          {isHardMode ? (
            <p className="font-medium text-5">Your Best: lv.{bestHardLevel}</p>
          ) : (
            <p className="font-medium text-5">
              Your Best: lv.{bestNormalLevel}
            </p>
          )}
        </div>
        <div className="flex gap-30 justify-center max-sm:flex-col max-sm:gap-15">
          <div className="grid grid-cols-3 gap-5 max-sm:mx-auto">
            {mainArray.map((num) => {
              const isRed =
                highlightedIndex !== null && arr[highlightedIndex] === num;
              return (
                <button
                  className={` px-9 py-7  rounded-xl text-2xl
                            ${isRed ? "bg-red-600 text-red-600" : " bg-blue-500 text-blue-500"}`}
                  key={num}
                  onClick={() => handleClick(num)}
                >
                  0
                </button>
              );
            })}
          </div>
          {/* <div className="grid grid-cols-3 gap-5 max-sm:mx-auto">
            {mainArray.map((num) => (
              <button
                className="px-9 py-7 bg-blue-400 text-blue-400 rounded-xl text-2xl cursor-pointer"
                key={num}
                onClick={() => handleClick(num)}
              >
                0
              </button>
            ))}
          </div> */}
        </div>
        {level === null ? (
          <button
            onClick={() => onStart()}
            className="bg-green-500 px-9 py-3 rounded-xl text-2xl cursor-pointer mt-5 text-amber-50"
          >
            Start Game
          </button>
        ) : (<div className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          <button
            onClick={() => onStart()}
            className="bg-red-400 px-9 py-3 rounded-xl text-2xl cursor-pointer mt-5 text-amber-50"
          >
            New
          </button>
          {/* <button
            onClick={() => confirmRestart()}
            className="bg-red-400 px-9 py-3 rounded-xl text-2xl cursor-pointer mt-5 text-amber-50"
          >
            Restart
          </button> */}
          </div>
        )}
      </div>
      <p></p>
    </div>
  );
}
export default SimonSays;
