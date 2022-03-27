import React from "react";
import { AppImages } from "src/assets/images";
const AvatarImage = props =>{
    return(
        <img src={AppImages.avatarImage2} style={props.style} alt={props.alt}/>
    )
}
export default AvatarImage