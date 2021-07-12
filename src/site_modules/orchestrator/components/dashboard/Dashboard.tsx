import React, { useEffect } from "react";
import { BrowserView, MobileView } from 'react-device-detect';

export function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard"
  }, []);
  
  return (
    <div>
      Dashboard
    </div>
  );
}

export default Dashboard;