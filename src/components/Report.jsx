import React from "react";


const Report = ({clipboard}) => {
  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(clipboard.join('')).then()
  }

  return (<div className="main__report report">
    {clipboard.length > 0 &&
      <pre className="report__container">
              {clipboard.join('')}
            </pre>
    }
    <button
      className="report__button"
      onClick={handleCopyBtnClick}
    >Copy
    </button>
  </div>)
}

export default Report