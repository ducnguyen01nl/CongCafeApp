import React from "react";

// ToastService.js
class ToastService {
    static ref = React.createRef();
  
    static showToast(message,type) {
      this.ref.current?.show(message,type);
    }
  }

  export default ToastService