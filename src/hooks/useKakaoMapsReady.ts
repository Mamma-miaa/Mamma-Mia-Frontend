import { useEffect, useState } from "react"
import * as Sentry from "@sentry/react"

const POLL_INTERVAL = 100
const LOAD_TIMEOUT = 10000

/**
 * 지도 SDK는 index.html에서 별도 스크립트로 불러오기 때문에
 * 광고 차단기·네트워크 실패로 로드되지 않는 경우가 있다.
 * 이때 전역 kakao를 그대로 참조하면 ReferenceError로 페이지 전체가 죽는다.
 */
const isKakaoMapsLoaded = () =>
  typeof window !== "undefined" &&
  Boolean((window as unknown as { kakao?: { maps?: unknown } }).kakao?.maps)

const useKakaoMapsReady = () => {
  const [isReady, setIsReady] = useState(isKakaoMapsLoaded)

  useEffect(() => {
    if (isReady) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      if (isKakaoMapsLoaded()) {
        window.clearInterval(timer)
        setIsReady(true)
        return
      }

      if (Date.now() - startedAt >= LOAD_TIMEOUT) {
        window.clearInterval(timer)
        Sentry.captureMessage("Kakao 지도 SDK 로드 실패", "error")
      }
    }, POLL_INTERVAL)

    return () => window.clearInterval(timer)
  }, [isReady])

  return isReady
}

export default useKakaoMapsReady
