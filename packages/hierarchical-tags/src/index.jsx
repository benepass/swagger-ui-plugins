import { HierarchicalOperations } from "./HierarchicalOperations";
import { HierarchicalOperationTag } from "./HierarchicalOperationTag";


export default function HeirarchicalTags() {
  return {
    components: {
      // Provide our classes raw for others
      HierarchicalOperations,
      HierarchicalOperationTag,
      // Override operations so it uses our component instead of the original
      operations: HierarchicalOperations,
    }
  };
};