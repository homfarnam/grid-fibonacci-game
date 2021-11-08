import React from "react"

interface TitleProps {
  text: string
  className?: React.HTMLAttributes<HTMLDivElement>["className"] | string
}

const Title: React.FC<TitleProps> = ({ text, className = "" }) => {
  return (
    <div className={className}>
      <h1>{text}</h1>
    </div>
  )
}

export default Title
