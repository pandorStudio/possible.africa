import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export default function CustomIconEvent() {
  const { mode, setMode } = useContext(ColorModeContext);
  if (mode === "dark") {
    return (
      <svg
        style={{
          height: 15,
          marginRight: "10px",
        }}
        width="15px"
        height="15px"
        viewBox="0 0 15 15"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <image
            width="100"
            height="100"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAABD9JREFUeJztne1xEzEQhncZ/nNUgDuIO+A6IFSAqYB0ENNBOgAqIFTAuQKSDkIFcSp4+XG6iXLWSbovbm2/z0xm7Kyk1d3r0+rLsgghhBBCCCFkLADWANb0sTAArgE84plHANf0sQAAvqGbb/TxHwFQRi6ioaSPMK+mLlBELr3X9yLy1v3de/8v6SPMHIL4ge9WVfequheRW+//JX2EmUMQMgIKYgwKYgwKYozXuQkBfJK651Ekkl5kFHcB4Heu7yP3sZe6U/Ajx2mWIG4QtMlJm0khM/RQDPu4BFCq6udUwmSTBWAr04pxrmzcvYyS84R88V7/EpHvUj+GXdxI+nG/F5GrDN/H7qOQ+sP8wb3/IiLbWIFRQVDPbvoxY+MGR7E8Ubtjr6pVRrqj9wGgEpFH97YAsFbVu670qSbrRQBPiUEOCdyzaKeI3V5jUBBjzCGI/4gWHa8f6CNM9sCwB5V4vQoAaF57aTqD2pn56Ed7kSYzTwFgH1nU2QNIjfZPykefRa3JmyzXqyhF5Clg/isi5dje2qn4CDFHkyWqegdgJfWgqFnouROR71NdxKn46MWQJoscsmiTRcbRS5BYEHOPdixvdJNZzO4CbGf5zh6tW8I+uG5N+bG6xfL2ot1kod4kdlA5AFvPflABPO9v+tPh54+z3wRsKzxvVNsk6lgG7BuvbquA/Sazbgf7sNwHoanbNmBf4+Umu2STFSUgSJfjKnFTfFYxH4G8l565Cti3nj1Vt02ibmXLViTq5tc9VbfO++OzRAxZ9Uw/ZW+ml+8lelIM6sZYQpCH1nv/UxgahM3pu+3T9vJCu31HPV2wCqRrAucdwkG9CZy3bZuzN+38NmArADw4+2XAvnb12iPc4Whi0ENH3Zp2vuqo262zhzochbvmrvi0wuH0Sxnyk0VbkMEFnTnWgzqJQEGMQUGMMctsrwuub+Yo2xBPsd0jQ5lcENcT+jl1uRYB8FFVgz3HoczRZI3ZnHZsTH6tjCHGmFuQr5qJiHxdMN9uYL7J4RNiDApiDApiDApiDApiDApiDApiDApiDApijFlmez3eAXifm3bBfG8G5vu/DFnCxct9UKdOlXlPfMpYWjZZxqAgxuBsb81uYL7J4RNiDApiDApiDApiDApiDApiDApiDApiDApiDApyTICzvSmqzHviU8bSzn1e1qkz+bXOIchW5v/ypgWeJHHC6BAmXzHU+jsT0x0ncWYwqBuDghiDghhjVAxB/k6Ns0JVd0PzDhYE9akMH5IJzxAAv1T14NSJHMY0Wcf7q5fzM/jejGmyruS8vuDZh4NzUSYBPOtkEpaeOiEjoCDGoCDGoCDHBFqnciJwahqJg+fT9rI6RppRYCUiHJFPw05Vy1iCnCbrSs5jfWNuniRj3JYUxK1vlCIyeH6GyE5Eor/O1pBsstqkBjbkJTrip/sIIYQQQgg5Uf4Bm1ZdBHDMhPMAAAAASUVORK5CYII="
            id="event_icon"
          />
        </defs>
        <use
          href="#event_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.15 0.15)"
        />
      </svg>
    );
  }
  return (
    <svg
      style={{
        height: 15,
        marginRight: "10px",
      }}
      width="15px"
      height="15px"
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <image
          width="100"
          height="100"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAA9lJREFUeJztneF1mzAUhW96+j90grJBvEG0Qd0JSidINijZIBsknaDOBCUTJN7AGySZIP0B1AJLSAIpPOz7naNzbCTxHlyLJySBAUIIIYQQQkgEVk2ijZn5BeAFwHuTXppttDEDd9gfQD/d0cbHomA/iDYp2jDzKfYOAay1z1sAX5q01bYr2jCTQhA98G0AvDZpo21XtGEmhSBkAhREGBREGBREGJ8Dyv5A3fPIHOUuPPZ1AeBvgO0l22g7Ar99jPoKcgeg8CzrQ4YEPRTBNtZNuZ+ugj6XrBJxxThVCtTnchCfFnKlfX4AcI+6Gdq4hbu5bwFce9heuo0MtRDfmu9XcIjiEmSFbswoMCwGPPLbMpVHuWOwUaEekATqc7kC8Gwr7Lpk9QO4j5OkS/+cDXaK2O0VBgURRgpB9CaaWT7vaMNMyI2hLxW6vYp37XOLNaidmI1gFLoTMj5kqH9dtkmdV7jv9o/NRrRJLYVwQYC6a2c6mB3iLRRYkg1vQVJcsoC6Keeo71tW2rZ7xOs6H4uNIBTGtRDSxbuFsNsrjFBBhoJY7qjruuYO5WeO/Wdw+zaUP8W3dv82pnYuOih0m9sLzM6VWr7JgXZ905PFzlOTf2vIy7FfqFY4fFSG/ELzLTfk33r6ZlqHlWm+lYb8FbqL7KL3smyGK4dBvX7usNFnreVVhvwywLfC4Vvf98zhm+67yzexMSQPLB+zNzOnbS8Y1IUxhyC73nf9V/j2wbb7NsVPLygcDhfkhnJFk/8Mc1BvA+fGkAfsr/OlIS9DfSLf0V3e2dLeTb/C3OFoY9DO4lsJewwAap9tHY4M9THb4lOOwzt9ZbHjhcJwUCN+iA7qZAAKIgwKIoxUo70rAOeJ9i2FNySYoEohyBrAnwT7lch32HuOo0hxyZqyOG1pRD9WxhBhpBbkBsCZZ7qZsd7jyHrRYQsRBgURBgURBgURBgURBgURBgURBgURBgURRqrR3pavAC4Dys5V73xkvQ9HIXwKt8LhWqRjTZXnOeEU7lKhIMLgaG8NR3uJGQoiDAoiDAoiDAoiDAoiDAoiDAoiDAoiDAqyMBQ42rv40V7xz+lFJPqxphCkRPqHNyXwBo/XvoaSYsbQ9uAn8YBBXRgURBgURBhTY8hlFC+Oj8exFacIssH+rZ2kywPMb51wMuWSFetFk8fI6HMzpYVc47Qe8AzB9F6UKCiED52QQ7hQbqlQEGFQEGFQkIXRfytnMas3y6RA5I5RhTiTOUzT/hPrP7Z/CGAKS7Z3Qo5iBbaUKamC5zuDz3wK9VAj6pwy1dwOEEIIIYQQIox/mDrggPKmr+4AAAAASUVORK5CYII="
          id="event_icon"
        />
      </defs>
      <g>
        <use
          href="#event_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.15 0.15)"
        />
      </g>
    </svg>
  );
}
