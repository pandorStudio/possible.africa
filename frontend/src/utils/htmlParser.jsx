import parse, { domToReact } from "html-react-parser";

export function Parse(content) {

       return parse(content.replace(/\\n/g, "<br />"))

}


export function ParseSlice(content){

    return ParseStrong(((content.slice(0, 500)+"...")))

}


 const parseOptions = {
  replace: (domNode) => {
    if (domNode.data && domNode.data.includes("iframe")) {
      console.log(domNode.data);
      // create a new iframe element with the string
      return(parse(domNode.data));
     }
  },

};

const parseStrongOptions = {
  replace: (domNode) => {
    if (domNode.data && domNode.data.includes('strong')) {
      return parse(domNode.data);
    }
  },

};


export const ParseIframe = (content) => {
  return parse(content.replace(/\\n/g, "<br />"), parseOptions)
}

export const ParseStrong = (content) => {
  return parse(content.replace(/\\n/g, "<br />"), parseStrongOptions)
}