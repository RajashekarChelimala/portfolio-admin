import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo } from "react";
import htmlIcon from "../../src/assets/icons/html-icon.svg";
import cssIcon from "../../src/assets/icons/css-icon.svg";
import sassIcon from "../../src/assets/icons/sass-icon.svg";
import jsIcon from "../../src/assets/icons/js-icon.svg";
import nodeIcon from "../../src/assets/icons/node-icon.svg";
import reactIcon from "../../src/assets/icons/react-icon.svg";
import typescriptIcon from "../../src/assets/icons/typescript-icon.svg";
import boostrapIcon from "../../src/assets/icons/bootstrap-icon.svg";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const ParticlesComponent = (props) => {
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
  const options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
      "fullScreen": {
        "enable": true,
        "zIndex": 0
      },
      "detectRetina": true,
      "fpsLimit": 60,
      "interactivity": {
        "events": {
          "onClick": {
            "enable": true,
            "mode": "push"
          },
          "onDiv": {
            "elementId": "repulse-div",
            "enable": false,
            "mode": "repulse"
          },
          "onHover": {
            "enable": true,
            "mode": "bubble",
            "parallax": {
              "enable": false,
              "force": 60,
              "smooth": 10
            }
          },
          "resize": true
        },
        "modes": {
          "bubble": {
            "distance": 400,
            "duration": 2,
            "opacity": 0.8,
            "size": 2,
          },
          "connect": {
            "distance": 80,
            "lineLinked": {
              "opacity": 0.5
            },
            "radius": 60
          },
          "grab": {
            "distance": 400,
            "lineLinked": {
              "opacity": 1
            }
          },
          "push": {
            "quantity": 2
          },
          "remove": {
            "quantity": 2
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          }
        }
      },
      "particles": {
        "color": {
          "value": "#ffffff"
        },
        "lineLinked": {
          "blink": false,
          "color": "#000",
          "consent": false,
          "distance": 150,
          "enable": false,
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "attract": {
            "enable": false,
            "rotate": {
              "x": 600,
              "y": 1200
            }
          },
          "bounce": false,
          "direction": "none",
          "enable": true,
          "outMode": "out",
          "random": false,
          "speed": 2,
          "straight": false
        },
        "number": {
          "density": {
            "enable": true,
            "area": 800
          },
          "limit": 15,
          "value": 10,
        },
        "opacity": {
          "animation": {
            "enable": true,
            "minimumValue": 0.2,
            "speed": 1,
            "sync": false
          },
          "random": true,
          "value": 1
        },
        "rotate": {
          "animation": {
            "enable": true,
            "speed": 5,
            "sync": false
          },
          "direction": "random",
          "random": true,
          "value": 0
        },
        "shape": {
          "character": {
            "fill": false,
            "font": "Verdana",
            "style": "",
            "value": "*",
            "weight": "400"
          },
          "image": [
            {
              "src": boostrapIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": cssIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": htmlIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": jsIcon,
              "width": 20,
              "height": 20
            },
            // {
            //   "src": mysqlIcon,
            //   "width": 20,
            //   "height": 20
            // },
            {
              "src": nodeIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": reactIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": sassIcon,
              "width": 20,
              "height": 20
            },
            {
              "src": typescriptIcon,
              "width": 20,
              "height": 20
            },
          ],
          "polygon": {
            "sides": 5
          },
          "stroke": {
            "color": "#000000",
            "width": 0
          },
          "type": "image"
        },
        "size": {
          "animation": {
            "enable": false,
            "minimumValue": 0.1,
            "speed": 40,
            "sync": false
          },
          "random": false,
          "value": 16
        }
      },
      "polygon": {
        "draw": {
          "enable": false,
          "lineColor": "#ffffff",
          "lineWidth": 0.5
        },
        "move": {
          "radius": 10
        },
        "scale": 1,
        "url": ""
      },
      "background": {
        "image": "",
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "cover"
      }
    };
  }, []);

  // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
  }, []);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;
