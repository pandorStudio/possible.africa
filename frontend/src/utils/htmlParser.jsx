import parse, { domToReact } from "html-react-parser";

export function Parse(content) {

       return parse(content.replace(/\\n/g, "<br />"))

}


export function ParseSlice(content){

    return Parse(content.slice(0, 500)+"...")

}


export function ParseIframe(content) {
    return parse(content.replace(/\\n/g, "<br />"), {
        replace: (domNode) => {

        
          if (domNode.type === "tag" && domNode.name === "iframe") {
            // Handle iframe parsing here
            const { src, width, height } = domNode.attribs;
            return (
              <iframe
                src={src}
                width={width}
                height={height}
                allowFullScreen
              />
            );
          }
          // Use default parsing for other elements
          return domToReact(domNode, {
            replace: (node) => {
              if (node.type === "text" && node.data === "\\n") {
                // Replace "\\n" with line break
                return <br />;
              }
              // Use default parsing for other text nodes
              return domToReact(node);
            }
          });
        }
      });
  }