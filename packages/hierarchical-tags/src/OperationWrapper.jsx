import React from "react"
import ImPropTypes from "react-immutable-proptypes"

// for debugging this issue
import Im, { fromJS } from "immutable"


const Wrapper = (Ori, system) => class OperationWrapper extends React.Component {

  static propTypes = {
    operation: ImPropTypes.map.isRequired,
  }

  onLoad = (ref) => {
    const { operation } = this.props
    const { tag, operationId } = operation.toObject()
    let { isShownKey } = operation.toObject()
    isShownKey = isShownKey || ["operations", tag, operationId]

    const scrollToKey = system.layoutSelectors.getScrollToKey()
    
    if (Im.is(scrollToKey, fromJS(isShownKey))) {
      system.layoutActions.scrollToElement(ref)
      system.layoutActions.clearScrollTo()
    }
    system.layoutActions.readyToScroll(isShownKey, ref)
  }

  render() {
    return (
      <span ref={this.onLoad}>
        <Ori {...this.props} />
      </span>
    )
  }
}

export default Wrapper
