import React from "react";

export default function Header({title = ''}) {
  const titleWordsArray = title.trim().split(' ')


  return (
    <header className="header">
      {titleWordsArray &&
        titleWordsArray.map((word) => (
          <span className='header__word'>
            {word}
          </span>
        ))}
    </header>
  )
}