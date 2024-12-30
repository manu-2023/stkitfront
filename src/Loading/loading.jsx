import Recact from 'react'
import { useEffect, useState } from 'react'


export default function Loading() {
    return (
        <div>
            <div><img src="/Images/spinner.gif" id="spinner" />
                <br></br>
                <h6 id="load">Loading....</h6></div>
        </div>
    )

}