import { Timestamp } from "firebase/firestore";

export function convertFirebaseTimestamp(timestamp:Timestamp) {
  if(!timestamp) return {}
    return {
      seconds: timestamp.seconds,
      nanoseconds: timestamp.nanoseconds,
    };
  }