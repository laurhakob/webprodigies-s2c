import { Shape } from "@/redux/slice/shapes"
import { Arrow } from "./arrow"
import { Elipse } from "./elipse"
import { Rectangle } from "./rectangle"
import { Line } from "./line"
 import { Frame } from "./frame"
import { Stroke } from "./stroke"
import { Text } from "./text"

const ShapeRenderer = ({
  shape,
  toggleInspiration,
  toggleChat,
  generateWorkflow,
  exportDesign,
}: {
  shape: Shape
  toggleInspiration: () => void
  toggleChat: (generatedUIId: string) => void
  generateWorkflow: (generatedUIId: string) => void
  exportDesign: (generatedUIId: string, element: HTMLElement | null) => void
}) => {
  switch (shape.type) {
    case 'frame':
      return (
        <Frame
          shape={shape}
          toggleInspiration={toggleInspiration}
        />
      )
    case 'rect':
      return <Rectangle shape={shape} />
    case 'ellipse':
      return <Elipse shape={shape} />
    case 'freedraw':
      return <Stroke shape={shape} />
    case 'arrow':
      return <Arrow shape={shape} />
    case 'line':
      return <Line shape={shape} />
    case 'text':
      return <Text shape={shape} />
  }
}

export default ShapeRenderer