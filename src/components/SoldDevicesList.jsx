import { Trash2 } from "lucide-react";
import createSoldDeviseString from "../utils/createSoldDeviseString";

export default function SoldDevicesList({ devices, onRemove }) {
  return (
    <div className="sold-devices">
      <div className="sold-devices__label">Sold Devices</div>
      {devices.map((el, index) => (
        <div className="sold-device__item" key={index}>
          <div className="sold-device__desc">
            <span>{createSoldDeviseString(
              el.deviceName,
              el.deviceType,
              el.deviceSize,
              el.isUsed,
              el.deviceCost
            )}</span>
          </div>
          <button
            className="sold-device__remove-btn"
            onClick={() => onRemove(index)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
