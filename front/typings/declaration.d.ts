declare module "*module.css" {
  import { CSSResult } from "lit-element";
  const css: CSSResult;
  export default css;
}

declare module "*.png" {
  const value: any;
  export default value;
}
