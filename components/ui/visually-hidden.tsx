const visuallyHiddenStyles = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute" as const,
  width: "1px",
  whiteSpace: "nowrap" as const,
  wordWrap: "normal" as const,
}

interface VisuallyHiddenProps {
  children: React.ReactNode
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span style={visuallyHiddenStyles}>{children}</span>
}
