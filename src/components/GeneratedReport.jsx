import React from "react";
import ReportContent from "./ReportContent";

export default function GeneratedReport({formInputs, salesItemInputs, isGenerated}) {
  const [clipboard, setClipboard] = React.useState('error')

  const handleCopyBtnClick = () => {
    navigator.clipboard.writeText(clipboard).then()
  }

  if (isGenerated) return (<>
    <div className="main__report report">
      <ReportContent
        formInputs={formInputs}
        salesItemInputs={salesItemInputs}
        setClipboard={setClipboard}
      />
      <button
        className="report__button"
        onClick={handleCopyBtnClick}
      >Copy
      </button>
    </div>
  </>)
}