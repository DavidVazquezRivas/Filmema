import React, { createContext, useState, useCallback, useContext } from 'react'

interface PanelState {
  isOpen: boolean
  content: React.ReactNode | null
  title: string
}

interface PanelContextValue {
  panelState: PanelState
  openPanel: (content: React.ReactNode, title: string) => void
  closePanel: () => void
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined)

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [panelState, setPanelState] = useState<PanelState>({
    isOpen: false,
    content: null,
    title: '',
  })

  const openPanel = useCallback(
    (content: React.ReactNode, title: string) => {
      setPanelState({ isOpen: true, content, title })
    },
    [setPanelState]
  )

  const closePanel = useCallback(() => {
    setPanelState({
      isOpen: false,
      content: null,
      title: '',
    })
  }, [setPanelState])

  return (
    <PanelContext.Provider value={{ panelState, openPanel, closePanel }}>
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error('usePanel must be used inside PanelProvider')
  }
  return context
}
