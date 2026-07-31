import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  // 로컬 개발 중에는 이벤트를 전송하지 않는다
  enabled: import.meta.env.PROD,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  // 무료 플랜 쿼터(월 5,000건)는 에러+트랜잭션 합산이라 트레이싱은 10%만 샘플링
  tracesSampleRate: 0.1,
  // 리플레이는 에러 발생 세션만 기록 (무료 플랜 월 50건)
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
})
