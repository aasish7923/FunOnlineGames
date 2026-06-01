
function GameBox(props) {
  return (
    <div className="bg-gray-300 p-5 rounded-2xl flex flex-col items-center gap-3 scale-100 hover:scale-105 transition-transform duration-300">
        <img src={props.image}
        alt={props.title}
        className="object-cover rounded-xl max-h-50 opacity-90 " />
        <h2 className="text-2xl font-bold">{props.title}</h2>
    </div>
  )
}

export default GameBox