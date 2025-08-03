// components/CustomCard.tsx
"use client"

import React from "react"

export const CustomCard = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="p-4 bg-white rounded shadow-md text-black w-[300px]">
      <h1 className="text-xl font-bold">Olá, Usuário!</h1>
      <p>Esse é um conteúdo personalizado.</p>
    </div>
  )
})

CustomCard.displayName = "CustomCard"
