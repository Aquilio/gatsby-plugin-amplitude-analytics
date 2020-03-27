import React from "react"
import PropTypes from "prop-types"

function OutboundLink({ href, target, onClick, eventData = {}, ...props}) {
  return (
    <a
      {...props}
      onClick={e => {
        if (typeof onClick === `function`) {
          onClick()
        }
        let redirect = true
        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false
        }
        if (target && target.toLowerCase() !== `_self`) {
          redirect = false
        }
        if (typeof window.amplitude === 'object') {
          window.amplitude.getInstance().logEvent(window.amplitudeEventTypes.outboundLinkClick, {
            href,
            ...eventData
          }, () => {
            if (redirect) {
              document.location = href
            }
          })
        } else {
          if (redirect) {
            document.location = href
          }
        }

        return false
      }}
    />
  )
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  eventData: PropTypes.object
}

export { OutboundLink }
