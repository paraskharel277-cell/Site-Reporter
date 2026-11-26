import { useState, useEffect } from "react";

function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function goOnline() {
      setIsOnline(true);
    }
    function goOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black text-center text-sm p-2">
      You are offline. Your reports are saved on this device.
    </div>
  );
}

export default OfflineBanner;