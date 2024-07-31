import { HierarchicalOperations } from "./HierarchicalOperations";
import { HierarchicalOperationTag } from "./HierarchicalOperationTag";
import { parseNestedNeepLinkHash } from "./Utils";
import OperationWrapper from "./OperationWrapper";

export default function HeirarchicalTags() {
  return {
    components: {
      // Provide our classes raw for others
      HierarchicalOperations,
      HierarchicalOperationTag,
      // Override operations so it uses our component instead of the original
      operations: HierarchicalOperations,
    },
    wrapComponents: {
      operation: OperationWrapper,
    },
    statePlugins: {
      configs: {
        wrapActions: {
          loaded: (ori, system) => (...args) => {
            // location.hash was an UTF-16 String, here is required UTF-8
            const hash = decodeURIComponent(window.location.hash)
            parseNestedNeepLinkHash(hash)(system);
            return ori(...args);
          }
        }
      }
    },
  };
};