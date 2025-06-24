import React, {useEffect, useState} from "react";


const Report = ({clipboard}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(clipboard.join('')).then()
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 500);
  }

  return (
    <div className="main__report report">
      {clipboard.length > 0 &&
        <pre className="report__container">{clipboard.join('')}</pre>
      }
      <button
        className="button button_copy-report"
        onClick={handleCopyBtnClick}
      >{!isCopied ? 'Copy' : 'Copied!'}
      </button>
    </div>)
}

export default Report