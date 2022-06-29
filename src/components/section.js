import React from "react";

export default function Section(){

  const [apidata,setapidata] = React.useState({});
  //Fetching data from api
  React.useEffect(()=>{
    console.log("USEF")
    fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data=>{
    setapidata(data.data.memes);
    }).catch((error)=>{
      console.log(error);
    })

  },[])

  //State for data
  const [memeImage,setmemeImage] = React.useState({
    topText:"Top Text",
    bottomText:"Bottom Text",
    imageurl:"https://i.imgflip.com/265k.jpg"
  })

  function handleChange(event){

    const finalvalue = event.target.value;
    setmemeImage((prevdata)=>{
      return({
        ...prevdata,
        [event.target.name]:finalvalue
      })
    })
  }

  //Function for image Change
  function buttonImage(){

    const randomNumber = Math.floor(Math.random() * apidata.length);

    setmemeImage((prevmeme)=>{
      const finalurl = apidata[randomNumber].url;
      return({
        ...prevmeme,
        imageurl:finalurl
      })
    })
  }

  return(
    <div className="section-container">

      <div className="input-cover">
        <div id="first-input" className="input-box">
          <input placeholder="Top text" onChange={handleChange} name="topText"/>
        </div>

        <div id="second-input" className="input-box">
          <input placeholder="Bottom text" onChange={handleChange} name="bottomText"/>
        </div>
      </div>

      <div className="generatememe">
        <button onClick={buttonImage}>Get a new meme image  🖼</button>
      </div>

      <div className="image-container">
        <img src={memeImage.imageurl}/>
        <h1 className="topText text">{memeImage.topText}</h1>
        <h1 className="bottomText text">{memeImage.bottomText}</h1>

      </div>

    </div>
  )


}
