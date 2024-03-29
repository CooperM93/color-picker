export default {
    root: {
        backgroundColor: "white",
        //border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover svg": {
            top: '0px'
        }
    },
    colors: {
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "lightgrey",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        position: "relative",
        marginBottom: "-4px"
    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3b30',
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '0px',
        top: '-50px',
        zIndex: 10,
        padding: '5px',
        borderRadius: '4px',
        opacity: 1,
        transition: 'all 0.3s ease-in-out'
    }
}