import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { writerContents, writerContentsFetch } from "../../api/writer";

export default function WriterButton({writer, index, setHoverBtn, setChecked, contents, setContents}){
    const [hoverOne, setHoverOne] = useState(false);
    const [image, setImage] = useState('');
    const buttonRef = useRef();
    const navigate = useNavigate();

    const handleChange =() => {
        setChecked((current) => !current)
        setHoverOne((current) => !current)
        setHoverBtn(buttonRef.current.id)
    }

    const handleClick = () => {
        let id = buttonRef.current.id;
        navigate(`writer/${id}`, {state: writer})
    }

    useEffect(()=>{
        setImage("/img/writer"+getRandomInt(0, 5)+".jpg");
        const writerId = writer.WRITERID;
        // async function getWriterContents(){
        //     const res = await writerContents(writerId);
        //     console.log(res);
        //     // setContents({...contents, [writerId]:{

        //     // }})
        // }
        // getWriterContents();
        writerContentsFetch(writerId)
        .then((res)=>res.json())
        .then((res)=>{
            setContents((current) => {
                let newContents = { ...current };
                newContents[writerId] = res.slice(0, 5);
                return newContents;
            });
        })
        .catch((e)=>console.log(e))
    }, []);


    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Button id={writer.WRITERID} ref={buttonRef} isProgress={writer.ISPROGRESS} onMouseOver={handleChange} onMouseOut={handleChange} onClick={handleClick}>
            <Img src={image} hover={hoverOne}></Img>
        </Button>
        </div>
    )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}


const Img = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 9999px;
    filter: grayscale(0%);

    ${({hover})=>hover&&`
        filter: grayscale(100%);
    `}

`

const Button = styled.button`
    border-radius: 9999px;
    margin-bottom: 60px;
    margin-left: 60px;
    cursor: pointer;
    border-width: ${(props)=>props.isProgress?"2px":"0"};

    width: 110px;
    height: 110px;

    ${({isProgress}) => isProgress === 1 &&
        `
        border: 2px solid transparent;
        background-image: linear-gradient(#fff, #fff), 
        linear-gradient(to right, red 0%,  orange 100%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        `
    }

    display: flex;
    justify-content: center;
    align-items: center;
    
    
`