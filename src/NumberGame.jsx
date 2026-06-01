import { useEffect, useState } from "react";

function NumberGame() {
    const [clickedNumbers, setClickedNumbers] = useState([]);
    const [level, setLevel] = useState(1);
    const [time, setTime] = useState(0); // Elapsed time in milliseconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!isTimerRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, time]);

    function formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    }

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }
  function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  if (level === 6) {
    alert(`Congratulations! You completed all levels!\nTotal Time: ${formatTime(time)}`);
    if(time< localStorage.getItem('time')) {localStorage.setItem('time', time);}
    setLevel(1);
    setIsTimerRunning(false);
    setClickedNumbers([]);
    setTime(0);
    return;
  }

  function handleClick(number, e) {
    setClickedNumbers([...clickedNumbers, number]);
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    e.target.classList.add("bg-green-400");


    if (clickedNumbers.includes(number)) {
      alert("Game Over! You clicked the same number twice.");
      setTime(0);
      setIsTimerRunning(false);
      setLevel(1);
      e.target.parentElement
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("bg-green-400"));
      setClickedNumbers([]);
      return;
    }
    if (number === clickedNumbers.length + 1) {
      if (clickedNumbers.length == 9) {
        e.target.classList.add("bg-green-400");
        setClickedNumbers([]);
        setLevel(level + 1);
        e.target.parentElement
          .querySelectorAll("button")
          .forEach((btn) => btn.classList.remove("bg-green-400"));
        return;
      }
      return;
    } else {
      alert("Game Over! You clicked the numbers in the wrong order.");
      setTime(0);
      setIsTimerRunning(false);
      setClickedNumbers([]);
      e.target.parentElement
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("bg-green-400"));
      setLevel(1);
      return;
    }
  }

  const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentNumbers, setCurrentNumbers] = useState(Numbers);

  useEffect(() => {
    setCurrentNumbers(shuffleArray(Numbers));
  }, [level]);

  return (
    <div className="flex flex-col items-center gap-5 min-h-screen bg-[#F3F4F6] p-5">
        <h1 className="text-4xl font-bold mb-20">Number Game</h1>
    <div className="flex flex-col text-2xl font-bold mt-5 ">
      <div className="flex flex-col gap-4 items-center bg-gray-200 p-9 mx-auto rounded-xl">
        <div className="font-medium m-0 p-0 text-gray-500">Best Time: {formatTime(localStorage.getItem('time') || 0)}</div>
        <div className="flex gap-2 justify-between max-w-2xl min-w-xs">
            
          <div className="flex gap-2">
            Level: <h1>{level}</h1> / 5
          </div>
          <div>{formatTime(time)}</div>
        </div>
        <div className="grid grid-cols-5 gap-4 m-5 max-w-2xl min-w-xs mx-auto">
          {currentNumbers.map((number) => (
            <button
              key={number}
              className="bg-blue-400 text-white m-2 font-bold py-2 rounded  hover:scale-105"
              onClick={(e) => handleClick(number, e)}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          className="bg-red-500 w-full text-white font-bold py-2 px-4 rounded-xl hover:scale-105"
          onClick={() => {
            setLevel(1);
            setTime(0);
            setIsTimerRunning(false);
            setClickedNumbers([]);
            setCurrentNumbers(shuffleArray(Numbers));
          }}
        >
          Restart
        </button>
      </div>
    </div>
    </div>
  );
}
export default NumberGame;
