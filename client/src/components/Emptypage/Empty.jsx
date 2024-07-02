import "./Empty.css";

const Empty = (props) => {
  return (
    <div className="EmptyDiv">
      <img src={props.image} style={props.style} alt="" />
      <h1>{props.message}</h1>
    </div>
  )
}

export default Empty
