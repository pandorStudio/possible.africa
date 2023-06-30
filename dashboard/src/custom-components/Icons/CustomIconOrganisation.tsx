import { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export default function CustomIconOrganisation() {
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
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAA+5JREFUeJzt3eFR20AQBeC3mfyHDlAqwB0gOiAVhFQAVBCnAqCCkApCB9gdmAqidOBUsPlhD5MBjUb2re4Ov/f99MDejeeN7yzrVoZA7t4AuALQAphF1hasACwA3JtZF1XUogq5+xWAu6h6MujazO4jCoUEwN1/ALiMqCWjPZjZ19QiyQFw9wsAv1LryF4+m9ljSoGIAPwG0KTWkb10Zvap2OjufuH9Ht29LTaxA+Pu7fY97XNRcmLzngmtik3owLl71/N+z1NqfkicU9PzWtKaJIMeel5rUgpOEQDJq0n559QAyDunAJBTAMgpAOQUAHIKALmPpQZ29xmA25xjmtn5mL9z96ep5/LKjZkVuYBWLAAAjrG5b6BGbebxjjOP90JLADkFgJwCQK7kHqDPH/T/4LGrBsCXgDr/+wmgC6hzCeAkoE6I2gLQmdk8tcj2XoToADyY2SK1yHZu1QRASwA5BYCcAkBOASCnAJBTAMgpAOQUAHK1XQg6cvezgDqnATXe1HR3D6hzFFAjTG0BmGFzBLpGB3nyWUsAOQWAnAJAruQeYA1gWXD8Ibnntc483otiAdjeBNmWGn+ImbWl55CLlgByCgA5BYCcAkCu5MmgFkDWEzhmNqopVtAl312cR9xvuA99ApBTAMgpAOQUAHK1BWBpAQCMOga+o/OguVV1+bu2AEhmCgA5BYCcAkBOASCnAJBTAMgpAOQUAHK1HQw5DWrSOEXfvVt3j7h5c4pTS3urLQA1N488yAdhagkgpwCQUwDIldwDdAC+Fxx/SO55dZnHe1HyZFAHYF5q/CEW0KzyvdASQE4BIKcAkCt5MKRBfEPnQWY2anPn7t+mnssrP7d7ouxKfgtokH8TOHZ3P59yEj2WKPRNQEsAOQWAnAJArrZfA/8CiHh+3jHif3Z9RkwvnxkqahZZWwBWFtCfZ6Kj59cW88iYBYCIbqghtASQUwDIKQDkFAByCgA5BYCcAkBOASCnAJCr7UrgWYEmjWM91Tu1/ekTgJwCQE4BIKcAkCt5MGQBYFT37ty2DR0p6BOAnAJATgEgpwCQK3kyaAbgNueYZjaqi3hQn6Jd3NjmOYrZlbwUXHM/oDbzeFM0tRpFSwA5BYCcAkCutp+DnwFcB9SZYoN5g5hTS3eoqFlkbQFYB52+CZjKG6uguRV7VHwfLQHkFAByCgA5BYCcAkBOASCnAJBTAMjVdiHoJKhJYxNQg0JtAWhQaQfxQ6UlgJwCQE4BIFdyD7DGpkmyFFTyZNAK9d4TSENLADkFgJwCQE4BIKcAkFMAyCkA5BQAcgoAuaReOLU9/oTUMuUxO/oEIKcAkFMAyCkA5P4BuNAOqGyXtzAAAAAASUVORK5CYII="
            id="organisation_icon"
          />
        </defs>
        <use
          href="#organisation_icon"
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
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAA5pJREFUeJzt3dFR20AUheGTTN6hA5QKcAeIDugg6YBQQZwKoANIB3QQUwFQQZwOnArIgxgmMwgjR3f3bjj/N6MXhkg78h+vRsJrKVYn6VzSraQHttDt9vHcdhNfi+pOlX+SXLbTia9JNZfKPylu2+WkV6aCE+WfDNftZMLrs9W7uTuQ9FMNz0tv3FrSx8wBvPS//1pSnzesN6fXcE6LvAvMsRwZ0F3mgN64tZ6f7+WcHb6fOaBu5GfXM/eJl12N/Kybs8MSAaCubs4/nhsA/nMEYI4AzBGAOQIwRwDmPiQee6Hh8WZNxxN/70fRUTx3pqQbaJkB7Kvd28V95ePtVz7eE6YAcwRgjgDMZV4DjPml8Qceu+okfQrYz9++a3gaN9dnSQcB+wnRWgBrzXy8+ahXfABXklYB++nVUABMAeYIwBwBmCMAcwRgjgDMEYA5AjDX2o2gPUlHAfs5DNjH2D4fAvazF7CPMK0FsFDM3bYSLrIHUAJTgDkCMEcA5jKvATaSbhKPv03tcW0qH+9JZgB34m8C0zEFmCMAcwRgjgDMZQbQq/6qWlPVHle/w9hC8Q5gjgDMEYA5AjDXWgA3GlYvnbtN/Rj4Lo6DxtbU7e/WAkBlBGCOAMwRgDkCMEcA5gjAHAGYIwBzrX0w5FAxizSWWHfvXDF/vFniU0v/rLUAWl48cpE9gBKYAswRgDkCMJd5DbCW9C3x+NvUHte68vGeZAewTDz+NsvsAdTCFGCOAMwRgLnMa4BO8Qs6v2bqxd3XoqN4Lmol8p1lB7CsfMypASxLDmLEjZICYAowRwDmCMBca08Dfyvm+/P2Ff/Y9V4xj4MXamixyNYCiFo3qFf8lz9+UcwilivFrIYaginAHAGYIwBzBGCOAMwRgDkCMEcA5gjAXGt3Ao8U8708JUTfWWwC7wDmCMAcAZgjAHOZF4ErDQsntqjVcYXjHcAcAZgjAHMEYC7zInChYd2dmqauIl77rt+ZYv4YdmeZAbS8HlBf+XglFrWahCnAHAGYIwBzrT0OvtfwAYy5SlxgRl2oXaihxSJbC2CjmE/flHCnmLGlfVX8GKYAcwRgjgDMEYA5AjBHAOYIwBwBmGvtRtCBYhZp7AL2YaG1ADoZrdTdAqYAcwRgjgDMZV4DbDQskoxEmQFELQqJGZgCzBGAOQIwRwDmCMAcAZgjAHMEYI4AMMtKw8KObHnb6pXXaCveAcwRgDkCMEcA5v4AAe9gVpGDFFEAAAAASUVORK5CYII="
          id="organisation_icon"
        />
      </defs>
      <g>
        <use
          href="#organisation_icon"
          fill="#FFFFFF"
          stroke="none"
          transform="scale(0.1171875 0.1171875)"
        />
      </g>
    </svg>
  );
}
