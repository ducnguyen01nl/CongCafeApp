import { Timestamp } from "firebase/firestore";

export function convertFirebaseTimestamp(timestamp:Timestamp) {
    return {
      seconds: timestamp.seconds,
      nanoseconds: timestamp.nanoseconds,
    };
  }