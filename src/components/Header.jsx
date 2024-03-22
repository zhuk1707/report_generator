import React from "react";

export default function Header({title = ''}) {
  return (
    <header className="header">
      {title}
    </header>
  )
}