import React from "react";
import myfinLogo from './../assets/myfin-logo.svg'

export default function CircleLink() {
  return (
    <a className='circle-link'
       href="https://myfin.by/currency/minsk?utm_source=myfin&utm_medium=organic&utm_campaign=menu&working=0"
       target={"_blank"}
       title={'Go to myfin.by'}
    >
      <div className="icon-wrapper">
        <img src={myfinLogo} alt=""/>
      </div>
    </a>
  )
}
