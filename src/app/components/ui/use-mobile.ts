import * as React from "react"

/**
 * A hook to determine if the current viewport is mobile-sized based on a media query.
 *
 * @param {string} [query="(max-width: 768px)"] - The media query to check against. Defaults to a common mobile breakpoint.
 * @returns {boolean} `true` if the media query matches, otherwise `false`.
 */
export function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Handler for media query changes
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Set the initial value
    setIsMobile(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener("change", handleMediaChange)

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleMediaChange)
  }, [query])

  return isMobile
}