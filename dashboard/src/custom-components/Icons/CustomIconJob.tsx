import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export default function CustomIconJob() {
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
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAACahJREFUeJztneF12zYQx+/6+j3aoNyg7gRhJ4g7gZUJnEwQdYImE1iZwPYEUiaIPYHpCWRP8O8HQK1M3UEkCBIAhd97eokpCjgJB+BwOByJCoVCoVAoFAqFQqFQKBQKhcL84dgCxADAgoh+J6LKvoiILohocXDbN2a+m1aywigAqABcAbgFsEN3LmPLXvAEwALANYCnHg3e5in29yj0BMCF7emhWMb+ToUOwAzzNwEbfs+sR4FZGIEAronoq8dHfxBRY19ExiC8Eu5bE9GWiBpm/uFRT2EMYOb5Tcee3ABYA7gEUDnKbE6Us4MZaerpvmnhCJi5votFv+7TWACWHRUKMMp3MeLXLEh0bPwVzHrfp/xTo0Cbf0J/x4JCh8a/g2OI71jHZU8FAMzKw0vhYpKVEWh/4Cd667E75DMz+xiDUl0VES3tnwsynsL3Jz52x8x/hai/IADd4HvBBHMxjNG5tPVp3Iwtx1kCM6dHa/yWLAsY41KjuJBDAuPkSaLxW3JpK4YdMrQHkgW6a3eZgGzayLSKLdssgLH6JZLZqgXwUEaBkYA+11axZdsDoFZk/BRbtqyBMbakNf8qtmxtYPwPbWa9kTQ60I2sKrZsbaA7j6rYsmWLMvwnM/e3gexCTnoa+CW2ACf4IFxLVgHIbBm3qSeWYR5AX/tXsWXTUKasXWy5sgSyZd3ElsuFQ2mTXQ6mPAVIHr5maiH6wMyN8layMQMpK4DUa14ml6I/j7EF6EPKCiDxEFuADkhKWkaAM6fYAIU0yU0B6tgCzI2UFSCH+b4rTWwBNFJWAMmYOhWTlwK/C9eaqYWYBYpTJVmLGmb3MivvZcojAJG8pq6nFqIHtXDt1eEgik7qCiDZAfXUQvRACgadky0zLchojx168ErS28HJAzkGP7kfFXpwaBVbtqyBnOFjG1uuNkrvTz4kLGkbwPb0SngrxU0hyd1boRwS8Ufp/VEPg2gA+KpMASlHMKUL9DV1HVs2DcUOKBFBPiDPiCBRaWPL5SJpG0CgiS2AC2ZO0TZxkpsC/BZbgLmRsgJIvalCwgGWKdsnGskqADNrLtSUl1WVcC3pGMFkFcByL1yT8vilgiRb2QvwBfrZwGVs2dooq5YkZc0Gu6zS8vHsUvhxYTasNoqMLynbLFkAfZMFiOxkgTkJ5EpZt4op32yAnIFjT8wcQZ8ccjU59P7UjcA9NenWdDWdGEdoyvdKRJc5OoaSBsBW6GlBEkN6yvMkyHOXQ8/PEsj2wM9IsmgngZPbqZwN0DOGTf6jK8rYTC3H2QE5Dcvk04Ay/Eebjs4GyIEXk+bkgx6sWob/sYE+964mlGEj1F9cvlMBeTWwwwQRuCgu3/g4GuF2grqfhHqbsesttFBGAWDEfP3QH0u3HKvOggKMLaBtFK1GqE9r/CZ0XYWOQPfFB90kgu5/ADKMApoVULKJB65DsznKuj82UJaFgeuQFGAWy75fYwsQgCpSvVImkJPYKeOK+su9JaJvZYexhTY8p1gHhj/ceofAZw1ziQfoS+hI3MG9DmZlshxYzIKIbhHQ5TxXBQg6TDpC1DsBs09xHUgcIqJVqILmoAB1rIrR3fV8QWGzhUrPUfAiWyPQDoNfaDoF+E7mbOL+RdR9pKmFa49E1DXTyabjfb3JUgEAfCH3MLgNXSczLwMX+cLM2y43BrZp35CVAti59B86bUzVowszE7JRANv4G+qWer2cIu5IFkZgz8YnMqeIy1O8O5DLCNCn8fcsrZX+MUSmTquE7z3kIJJzHP9mbRlfeXw/ez90WTspAbxnsGVUA2S4hPsIWG5skMPZBeingwE9K5eLWwBX6KEM0HcCc+cngAWP2H5ewKzvP5Cx5Gvlto/MvAbwQkTvAlV9z8xHfnaYZI9VoDpS4+8kbACYHnlNJvtHdeL278y8tv/f0rFX7JGM163vSuDIqWOV8ZQ8OXMVVQFgtkb7ePOeWw6ZLR0rwDsyhtqK+vnfG+GaNE8+E9G6R7kp0TYcqxhC7OfVjce89dQqx3k+z76/hh47eMhKkbPNdppfKTzSl57UDwCT8eOWzLKu9iiiwoEBZ5d3z8J99f59Zl4y84KI/lLuPWsmUwAA10T0RN2yfD0T0Tcy5+zb1K2/pVy8R8mamPmOiEoMX4vRFeCg138l95boK5kdtz+YuWLmTyQ3bt36eyvccwF5nVsSN7cYVQHsXLwhd69/JaK/iaiyw/Whl2or3P/G6LM9Wxopjuq0U4aUeu5sGU0BDhrflUZl3/ArJdhxK1xb4DgkSrpPU7q1cv0sGUUBYJZ3G9KH/B9EdOFo+D11x+vS0C5GzdgRoxiDluAKYHvnLemN/5mZa9cGzYHdoO3otcsW53boEbT5bIaMTFAFOBj2pcZ/JWPgOS1xO3r8JLfd8KbB7Sgize1aGTk8gXQSgnkCrdWt9fxHImobeFIZp0K9Xh3l3NHxsH80DVglTWonDICkkK+5bdtuFA/bg7IkO/zsAmZ3ysUDHLt40B8xc9m6T8s8uhLKHM0TCLPFfOo7AwO3slt1HhGiXNcp3U65cqEc8HQ1jlKOlFF03bpH+9GP6sBICgD3NrfEDgEOg0gFDy3TlS+389O9oCd7aNDj+DVkRdwdvK+NEsBECgD3UXMXg59BKBUawgi8IXlOPTnnH7BVrr+jfha7tBpY4P9pIIWHTfg+9bTCCM8gHKQAML2zFt66t+vtTjDzioxvoM0+GLRrOQ3J5wL3P1zdtawRqQZ8NngauqEjgBSY+Ep+hyAvSXbQXKBfhO9auPah9e8QvI6Fn+BPbkHGSxoMKFOptwI4ev8nnzPs9jOXJPv1l+ieiEmbBlYUZvm36CFLSojBMUP8AEvh2vNBuFZvmPkB5nnBUo+/AfBwyq5g5gbAIx331JCnc29g1u6Nx2elULUrHPsCJN/Ae/iFgy8pZPQPdGva18Bpl69F/HZKCQv3gxw0VkI5c40I/g/fKaBWrq89y3uDjQUYYhQGkeMc8FUAaTlyHzh/jbdR6NgbKLTwVQDJEt4OkOOIAEZhif7pgK8RKK1HAXlTYyi3JBucNzBePm3UGeuJYo9kwtsqCp/5Ywwa+9qSMH32VgDoRliMgMsYvfxlyEonJhBc/z5TQHkowozwUYAmtBCFePRWAIe/vZAhvkZgTSZyZ07TQRNbgBh4KYBdogXx+hXikkWOoMJ4FAU4c4oCnDlFAc6cJFLEZMZ7SC61TEkuSVRKWLf3WHsKKXBfpgAHdrn7LbYcI/K1jAAdgDkLMLfzhB+ZeV1GgA4wc01EH2keLvB7MlHIayKifwF52RegCoL1yQAAAABJRU5ErkJggg=="
            id="job_icon"
          />
        </defs>
        <use
          href="#job_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
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
          width="128"
          height="128"
          href="data:image/png;base64,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"
          id="job_icon"
        />
      </defs>
      <g>
        <use
          href="#job_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
        />
      </g>
    </svg>
  );
}
