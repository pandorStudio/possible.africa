import  './Card.css'

// eslint-disable-next-line react/prop-types
function Card({title, description, imgUrl}) {
  return (
    <div className="main_card">
    
        <div className='image_section' style={ { 'background-image': `url(${imgUrl})`}}>

        </div>
        <div className="text_section">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default Card