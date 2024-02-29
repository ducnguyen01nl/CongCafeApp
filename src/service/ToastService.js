import React from "react";

// ToastService.js
class ToastService {
    static ref = React.createRef();
  
    static showToast(message) {
      this.ref.current?.show(message);
    }
  }

  export default ToastService