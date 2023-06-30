import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export default function CustomIconArticle() {
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
            width="128"
            height="128"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAA6lJREFUeJzt3cFZ2zAYxvHvM7mXDcoGYLDPTScpbEAnACYoG5RO0I6Qnp3EGSHdgN4dfb2EC21CiiRL4n1/Vz+PosP/iZzYlkWIiIiICI6GGmg+n1uosQrwKCJXTdP8SD0RX1XqCRTqWES+LxaLy9QT8cUAPJjZ19IjYACeSo+AAQRQcgSTmIOb2ceY449JVe9F5HTX8W0EcnFx8TDerPxFDaBt21nM8cfUdd2j6v4fTSVGwCUgsNKWAwYQQUkRMAAPqvpZRH7/61gpETAAD8651dHR0VQKjoABeKrruugIGEAAJUfAAAIpNQIGEFCJETCAwEqLgAFEUFIEDCCSUiJgABGVEAEDiCz3CBjACHKOgAGMJNcIGMCIcoyAAYwstwgYQAI5RRD1ljAffd+fmNn71PN4stls3oUcr67rVd/3081mMxORv8Ye6/aybAMYhuFSVW9Sz+PJS/cDvkYOEXAJSCz1csAAMpAyAgaQiVQRZHsOUFXV2jn3M/U8nqjqmTxbp1X1dLlcBnsq2sxERG5E5H7H8eDnBFEfD2+aJvyZUyJd181U9UPqeYiIqOpVqAi4BBTIzL6EGosBlOk41EAMABwDAJftr4DctG07TfXZMfdf4jcAOAYAjgGAYwDgGAA4BgCOAYBjAOAYADgGAI4BgGMA4BgAOAYALtvLwYvF4tLMPu063jTNQTuRz+fzvbt8j0FVv+W6gXS2ATjnTlR16juOmZ2lvpkzp7ubn+MSAI4BgGMA4LI9BxCR2fZJGS9VVT0452b+0/GS+vN3yjaA7etmZr7j5Hr2nQsuAeAYADgGAI4BgGMA4BgAOAYAjgGAy/aPoJc2ijw/Pz/oClvf92dmFnSTx/+lqr/qul6nnMMu2QZwwEaRB+0/NAzDferLwWZ2JyK3KeewC5cAcAwAHAMAl+05QKiNIlV1FeKyso+qqtZJJ7BHtgFsL+M++I7TNM2192TeMC4B4BgAOAYAjgGAYwDgGAA4BgCOAYBjAOCy/Sew67rbfZeDD30dTQ6vejGzu7Ztb1POYRd+A4BjAOAYADgGAC7bk8DJZPIwDMMswDjXwzAEe8vWK+ewTvn5+2QbwPYu2nWAcVbek3nDuASAYwDgGAA4BgCOAYBjAOAYADgGAI4BgGMA4BgAOAYAjgGAYwDgGAA4BgCOAYBjAOAYADgGAI4BgGMA4BgAuKjPBSyXy6RP5b4VzrloY0cNIIMXNtILuASAYwDgGAA4BkBEREREhOYP4oqosZm62VkAAAAASUVORK5CYII="
            id="article_icon"
          />
        </defs>
        <g>
          <use
            href="#article_icon"
            fill="#FFFFFF"
            stroke="none"
            transform="scale(0.1171875 0.1171875)"
          />
        </g>
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
          width="128"
          height="128"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAuRJREFUeJzt3eFt00AAR/E/iO+wAdmg2YCyARuQEdiAbgAbtGwSNugIYQLoBPAhRW2VOHHru9zF7/0kK1IjXZ341XHqi5NIkiRJE/wFLb+TfCrztM1H643SYlmVeOLmovXGMILGWm8II2is9UZovawmP4MNvKk8/sfK45/S9yQXB+6/vr+9qb8qfdr3VzEn68x4T1CCAcAjMAB4BMQAviT5s+fnyAiIAVwmWcYIknADSIwgCTuAxAjwASTwCAxgCxuBATxARmAAT+EiMIBdqAgMYD9MBAYwDBGBARw2+wgM4LhZR2AA48w2AgMYb5YRGMDzdBFB7TmBUyySvG+9Eo+8LTzebbYBrQfGvr6/vSn8e6spvQe4Ghizp+Vy4mNMGu8JXtccXKP83xPcDdx/nYoRGEAfmkVgAP1oEkHPB4GbJD9br8Qjy+werF2k/Ludr9l+CGWfrg8MiW8DWy2rUg/Kl4Dz9K3UQAZwnt6VGsgA4AwA7lXBsfYd9JUcn6zac+seAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4HqeFLpK8vnA/WOvRH7sKt+n8COdTuTsOYBFyn3y5kOBcaboaXbzE74EwBkAnAHA9XwMsC40zk3BsV6q9e8f5KTQ8+CkUNVhAHAGAGcAcAYAZwBwBgBnAHA9/ydwkcMXihx7hm3ftX1O7Ve21zyatVNfKHKs9ZFxTrFcPe+h76h2/SVfAuAMAM4A4Ho+CNykzFSq2wJjTLVpvQJDPB18HjwdrDoMAM4A4AwAzgDgDADOAOAMAM4A4HoO4CqeDq6u5wB0AgYAZwBwBgDX8+ngxf0yZD1ynGUKfsvWC20ybU5AtdPBPQegB84HUB0GAGcAcAYAZwBwBgBnAHAGAGcAcAYAZwBwBgBnAHAGAGcAcAYAZwBwBgBnAHAGAGcAcAYAZwBwtS8U2fo7e3VE7Q+GqB4/GKLpDADOAOAMQJIkSaL5B0zAZ5En22JXAAAAAElFTkSuQmCC"
          id="article_icon"
        />
      </defs>
      <g>
        <use
          href="#article_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
        />
      </g>
    </svg>
  );
}
