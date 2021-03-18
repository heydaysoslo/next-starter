/**
 * Browser API Vibration
 * @note Not well supported yet unfortunately.
 * @see https://caniuse.com/#feat=vibration
 */
type Props = {
  /**
   * [Vibrate, Pause, …] in miliseconds
   */
  sequence: number[]
}
const useVibrate = ({ sequence = [200, 100, 200] }: Props) => {
  const vibrate = () => {
    if (typeof window !== 'undefined' && window?.navigator?.vibrate) {
      window.navigator.vibrate(sequence)
    }
  }
  return vibrate
}

export default useVibrate
