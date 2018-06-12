import saga1 from "./saga1"
import saga2 from "./saga2"
import { spawn } from "redux-saga/effects"

export default function* rootSaga() {
  // console.log("root saga started")

  /**
   * Execute all the other saga.
   * If other saga's fail, this saga will keep runing,
   * because we launched it using `spawn`
   * If he launched it using `fork` one saga fall down will take all the saga with it.
   */
  yield spawn(saga1)
  yield spawn(saga2)
}
