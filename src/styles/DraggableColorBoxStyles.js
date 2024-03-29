import sizes from './sizes';
import chroma from 'chroma-js';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-5px",
        paddingBottom: "2px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
        },
        [sizes.down("lg")]: {
            width: '25%',
            height: '20%'
        },
        [sizes.down("md")]: {
            width: '50%',
            height: '10%'
        },
        [sizes.down("sm")]: {
            width: '100%',
            height: '5%'
        }   
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0px",
        bottom: "0px",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: props => 
            chroma(props.color).luminance() <= 0.09 
            ? "rgba(255,255,255,0.8)" 
            : "rgba(0,0,0,0.6)"
    },
    colorName: {
        width: '80%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    deleteIcon: {
        marginRight: "15px",
        transform: "scale(0.8)",
        transition: "all 0.3s ease-in-out"
    },
};

export default styles;