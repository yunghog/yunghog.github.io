import React from "react";
import AvatarBackground from "./AvatarBackground";
import AvatarImage from "./AvatarImage";
import '../../styles/style.css'
const Avatar = props =>{
    return(
        <div style={{...props.style,position:'relative'}}> 
            <AvatarBackground style={styles.avatarBackground}/>
            <AvatarImage style={styles.avatarImage}/>
        </div>
    )
}
const styles = {
    avatarBackground:{
        width: '100%',
        position: 'absolute',
        zIndex: '-10',
        top: '10%',
        left: '-15%'
    },
    avatarImage:{
        width: '100%'
    }
}
export default Avatar