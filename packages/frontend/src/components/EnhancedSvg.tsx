import parse, { Element, domToReact } from "html-react-parser";

interface EnhancedSVGProps {
  svgString: string;
  className: string;
  //
  isSvgRemoved?: boolean;
}

export default function EnhancedSVG({
  svgString,
  className,
  //
  isSvgRemoved = false,
}: EnhancedSVGProps): JSX.Element {
  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element) {
        // Remove <title> tags entirely
        if (domNode.name === "title") {
          return <></>;
        }

        // When encountering <path> elements, add the className
        if (domNode.name === "path") {
          const pathProps = domNode.attribs;
          return <path {...pathProps} className={className} />;
        }

        // Handle the <svg> tag to remove or alter attributes but include its children
        if (isSvgRemoved && domNode.name === "svg") {
          // Keep the children of the svg but ignore the svg tag itself and any attributes
          // This effectively strips the <svg> and </svg> tags, but keeps everything inside
          return <>{domToReact(domNode.children as any, options)}</>;
        }
      }
    },
  };

  const content = parse(svgString, options);

  return <>{content}</>;
}
