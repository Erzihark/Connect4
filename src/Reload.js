import React from "react";

export default function Reload(){
    function refreshPage(){
        window.location.reload(false)
    }

    return (
        <button className={"button-19"} onClick={refreshPage}>Restart</button>
    )
}