const Tag = (({data}) => {
  const backgroundBrightness = 0.299 * Number.parseInt(data.color.substring(1,3), 16) + 0.587 * Number.parseInt(data.color.substring(3,5), 16) + 0.114 * Number.parseInt(data.color.substring(5), 16);
  return (
    <div 
      style={{background: data.color, borderRadius: 10, height: 25, display: "flex", overflow: "hidden", padding: "0px 10px", alignItems: 'flex-start'}}
      onClick={data.onClick}  
    >
      <p style={{fontWeight: "600", color: backgroundBrightness > 100 ? "black" : "white"}}>{data.name}</p>
    </div>
  )
})

export default Tag;