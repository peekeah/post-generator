"use client"
import { createContext, ReactNode, useState } from "react";

interface Subscription {
  totalUsage: number,
  postLimit: number,
  nextBillingDate: string
}

const initialValues = {
  totalUsage: 0,
  postLimit: 0,
  nextBillingDate: ""
}

export const SubscriptionContext = createContext({
  subscription: initialValues,
  updateSubscriptionValues: (data: Subscription) => { },
})

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscription, setSubscription] = useState({ ...initialValues })
  const updateSubscriptionValues = (data: Subscription) => {
    setSubscription(data)
  }
  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        updateSubscriptionValues
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}
