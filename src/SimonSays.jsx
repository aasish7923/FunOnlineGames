import { useState, useEffect } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SimonSays() {
  const [arr, setArr] = useState([]);
  const [level, setLevel] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedNumbers, setClickedNumbers] = useState([]);

  const mainArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bestLevel = localStorage.getItem('bestLevel') || 0;

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
        await wait(100);

        for (let i = 0; i < sequence.length; i++) {
          setHighlightedIndex(i);
            await wait(200);
          setHighlightedIndex(null);
            await wait(100);
        }
        setIsPlaying(false);
      };

      playSequence(a);
    }
  }, [level]);

  function handleClick(num) {
    const currentIndex = clickedNumbers.length;
    if (isPlaying || currentIndex >= arr.length) return;
    if (num !== arr[currentIndex]) {
      alert("You messed up!");
      localStorage.setItem('bestLevel', level)
      setLevel(null)
      return;
    }
    const newClickedNumbers = [...clickedNumbers, num];
    setClickedNumbers(newClickedNumbers);

    if (newClickedNumbers.length === arr.length) {
      setTimeout(() => {
        alert("Level Complete!");
        setLevel(level + 1);
        setClickedNumbers([])
      }, 500);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center bg-[#F3F4F6]">
      <h2 className="text-3xl font-bold">Simon Says</h2>
      
      <div className="flex flex-col w-fit">
        <div className="flex justify-between">
      {level !== null ?
        <p className="font-medium text-5">Level: {level}</p>
      : <p></p>}
      <p className="font-medium text-5">Your Best: lv.{bestLevel}</p>
      </div>
        <div className="flex gap-30 justify-center max-sm:flex-col max-sm:gap-15">
          <div className="grid grid-cols-3 gap-5 max-sm:mx-auto">
            {mainArray.map((num) => {
              const isRed = highlightedIndex !== null && arr[highlightedIndex] === num;
              return (
                <button
                  className={` px-9 py-7  rounded-xl text-2xl
                            ${isRed ? "bg-red-500 text-red-500" : " bg-blue-400 text-blue-400"}`}
                  key={num}
                >
                  0
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-5 max-sm:mx-auto">
            {mainArray.map((num) => (
              <button
                className="px-9 py-7 bg-blue-400 text-blue-400 rounded-xl text-2xl cursor-pointer"
                key={num}
                onClick={() => handleClick(num)}
              >
                0
              </button>
            ))}
          </div>
        </div>
        {level === null ? (
          <button
            onClick={() => setLevel(1)}
            className="bg-green-400 px-9 py-3 rounded-xl text-2xl cursor-pointer mt-5 text-amber-50"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={() => {
              setLevel(null);
              setClickedNumbers([])
            }}
            className="bg-red-400 px-9 py-3 rounded-xl text-2xl cursor-pointer mt-5 text-amber-50"
          >
            Re-start
          </button>
        )}
      </div>
      <p></p>
    </div>
  );
}
export default SimonSays;
