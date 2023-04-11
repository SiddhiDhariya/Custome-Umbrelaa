import React from "react";
import Img1 from "../assets/Blue.png";
import Img3 from "../assets/Pink-umbrella.png";
import Img2 from "../assets/Yello-umbrella.png";
import Img4 from "../assets/upload_icon.svg";
import Img5 from "../assets/loader_icon.svg";
import Button from '@mui/material/Button';
import './umbrella.scss';
import { useState ,useRef} from "react";


const Umbrella =()=>{
    const [image,setImage] = useState(Img1);
    const [loader,setLoader] =useState(false);
    const [bgcolor , setBgcolor] =useState("blue");
    const [err ,setErr] =useState("");
    const [img1,setImg1] =useState(null);
    const inputRef = useRef(null);
    const [fileName,setFileName] = useState("");

    let fileObj=null;
    
        
    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = event => {
    fileObj=event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
        setImg1(URL.createObjectURL(fileObj));
        if(fileObj.size/1000000 > 5){
            setErr("Pleses Enter Image Which Is Less Than 5MB");
        }
        else if(!(fileObj.type ==="image/png" || fileObj.type ==="image/jpg")){
            setErr("Pleses Enter JPG or PNG image");
        }
        else{
            setErr("");
                      setFileName(fileObj.name);
        }
    };
    
    const onclickHandler = (c1) =>{
        setLoader(true);
        setImage(null);
        setTimeout(()=>{
        if(c1==="blue"){
            setImage(Img1);
        }
        else if(c1==="Yellow"){
            setImage(Img2);
        }
        else{
            setImage(Img3);
        }
        setBgcolor(c1);
        setLoader(false);
    },8000);
    };
    
    let bg = "container " + bgcolor;

    return(
        <div className={bg}>
            <div className="right">
                {image!==null?<img src={image}  alt="" className="img1" ></img>:null}
                {loader?<img src={Img5} alt="" className="img5"></img> :null}
                {(err===""  && img1!=null) && !loader ? <img className="logo" src={img1} alt=""/>: null}
            </div>
            
            <div className="left">
                    <h1>Custom Umbrella</h1>
                    <div className="colors">
                        <div className="b1" onClick={()=>onclickHandler("blue")}></div>
                        <div className="y1" onClick={()=>onclickHandler("Yellow")}></div>
                        <div className="p1" onClick={()=>onclickHandler("pink")}></div>
                    </div>
                    <h2> Customize your umbrella</h2>
                    <h3>Upload a logo for instance preview.</h3>
                    <h4>.png and .jpg files only. Max file size is 5MB.</h4>
                    <input
                        style={{display: 'none'}}
                        ref={inputRef}
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Button variant="contained" className={bgcolor}  onClick={handleClick}><img src={Img4} alt="my" width={"20px"}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fileName===""?`  UPLOAD LOGO`:fileName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button><br/>
                    {err!== "" ?<span>{err}</span> : null}
            </div>
        </div>
    );
};

export default Umbrella;