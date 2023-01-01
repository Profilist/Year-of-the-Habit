export default function progressBarComponent(props) {
  return (
    <div 
      style={{ 
        border: "1px solid black", 
        height: "3rem", 
        alignSelf: "normal",
        margin: "10%",
        borderRadius: "20px", 
        backgroundColor: "#CC232A"}}>

      <div
        className="progress-bar"
        style={{
          width: `${props.total/props.num*100}%`,
          backgroundColor: "#F2888B",
          height: "100%",
          alignItems: "normal",
          display: "flex",
          borderRadius: "20px",
        }}>

      </div>
    </div>
  );
}
