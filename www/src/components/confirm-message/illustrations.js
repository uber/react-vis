import React from 'react'
import {css, keyframes} from '@emotion/core'
import {fonts} from '../../lib/typography'
import theme from '../../../config/theme'

// PleaseConfirmIllustration
const PaperRollOut = keyframes`
from, 0% {
    transform: translate(10px, 80px);
}
to, 100% {
    transform: translate(10px, 0);
    
}
`
const ButtonRollOut = keyframes`
from, 0% {
    opacity: 0;
    transform: translate(0px, 80px) scale(1);
    transform-origin: center center;
}
70% {
    transform: scale(1);
}
90% {
    transform: scale(0.95);
    transform-origin: center center;
}
to, 100% {
    opacity: 1;
    transform: translate(0px, 0) scale(1);
    transform-origin: center center;
}
`
const TextCopyRollOut = keyframes`
from, 0% {
    opacity: 0;
    transform: translate(0px, 80px);
}
to, 100% {
    opacity: 1;
    transform: translate(0px, 0);
}
`
const TextCopyWidth1 = keyframes`
from, 0% {
    width: 0;
}
to, 100% {
    width: 25;
}
`
const TextCopyWidth2 = keyframes`
from, 0% {
    width: 0;
}
to, 100% {
    width: 47;
}
`
const NotificationFadeIn = keyframes`
0% {
    opacity: 0;
    r: 0;
}
50% {
    opacity: 0;
    r: 0;
}
100% {
    opacity: 1;
    r: 9.5;
    
}
`
// SVG
export const PleaseConfirmIllustration = (
  <div
    css={css`
      .paper {
        animation: ${PaperRollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
        transform: translate(10px, 0);
      }
      .text-copy {
        animation: ${TextCopyRollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
        transform: translate(0px, 0);
        rect:nth-of-type(1) {
          animation: ${TextCopyWidth1} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
          width: 25;
        }
        rect:nth-of-type(2) {
          animation: ${TextCopyWidth2} 1.5s 250ms cubic-bezier(0.19, 1, 0.22, 1)
            1;
          width: 47;
        }
      }
      .button,
      .text-button {
        animation: ${ButtonRollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .notification {
        position: absolute;
        animation: ${NotificationFadeIn} 1.4s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      text {
        animation: ${NotificationFadeIn} 1.25s 250ms
          cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .cursor {
        animation: ${TextCopyRollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100"
      height="109"
      viewBox="0 0 100 109"
    >
      <defs>
        <rect id="please-confirm-a" width="79" height="85" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#737794"
          d="M49.5384615,86.7692308 C49.1356923,86.7692308 48.7350769,86.6572308 48.3818462,86.4332308 L1.54931641,56.2793846 C0.894547175,55.8636923 0.515470252,55.1249231 0.554239483,54.3495385 C0.59516256,53.5763077 1.04747025,52.8806154 1.74316256,52.5338462 L49.5384615,22.1538462 L98.393312,52.5338462 C99.0868505,52.8806154 99.541312,53.5741538 99.5822351,54.3495385 C99.6231582,55.1249231 99.2419274,55.8615385 98.5871582,56.2793846 L50.6950769,86.4332308 C50.3418462,86.6572308 49.9412308,86.7692308 49.5384615,86.7692308 Z"
        />
        <g transform="translate(10 4)" className="paper">
          <mask id="please-confirm-b" fill="#fff">
            <use xlinkHref="#please-confirm-a" />
          </mask>
          <path
            fill="#EAEBEE"
            d="M71.8461538,84.9230769 L7.23076923,84.9230769 L7.23076923,7.38461538 C7.23076923,6.19569231 8.19569231,5.23076923 9.38461538,5.23076923 L69.6923077,5.23076923 C70.8812308,5.23076923 71.8461538,6.19569231 71.8461538,7.38461538 L71.8461538,84.9230769 Z"
            mask="url(#please-confirm-b)"
          />
        </g>
        <circle
          className="notification"
          cx="80"
          cy="9.5"
          r="9.5"
          fill="#E86C60"
          fillRule="nonzero"
        />
        <text
          fill="#FFF"
          fontFamily={fonts.bold}
          fontSize="10"
          fontWeight="600"
          letterSpacing="1"
        >
          <tspan x="77.63" y="12.308">
            1
          </tspan>
        </text>

        <rect
          width="47.385"
          height="16"
          x="26.385"
          y="35.077"
          fill={theme.brand.primary}
          fillRule="nonzero"
          rx="4.308"
          className="button"
        />
        <path
          className="text-button"
          fill="#FFF"
          fillRule="nonzero"
          d="M40.6653846,45.5046154 C40.6653846,45.8086463 40.6074665,46.0982366 40.4917263,46.3713834 C40.3773673,46.6412707 40.2190643,46.8821667 40.0175835,47.0928057 C39.8150973,47.3044957 39.5777827,47.4726896 39.3071079,47.5965577 C39.0320035,47.722453 38.7359917,47.7853846 38.4215384,47.7853846 C38.1614528,47.7853846 37.8977871,47.7496333 37.6309689,47.6784818 C37.3496631,47.6034669 37.0955049,47.4716812 36.8707231,47.284363 C36.6460362,47.0971239 36.4625087,46.8578413 36.320301,46.5688385 C36.1745655,46.2726664 36.1038461,45.9053818 36.1038461,45.4676923 L36.1038461,40.6430769 C36.1038461,40.3247168 36.1588934,40.0265438 36.2694192,39.7502293 C36.3803352,39.4729394 36.5385317,39.2309918 36.7432233,39.0263002 C36.9475324,38.821991 37.190863,38.6620881 37.4713479,38.5471353 C37.7526345,38.4318539 38.0617224,38.3746154 38.396923,38.3746154 C39.054039,38.3746154 39.599696,38.5938109 40.0175835,39.0302713 C40.2207369,39.2426589 40.3796487,39.4936935 40.4939111,39.7816348 C40.6083953,40.070135 40.6653846,40.3824362 40.6653846,40.7169231 L40.6653846,41.4592308 L38.91,41.4592308 L38.91,40.7907692 C38.91,40.5988424 38.8578851,40.4394321 38.7529479,40.3036311 C38.6613975,40.1851541 38.5460753,40.13 38.3846153,40.13 C38.157283,40.13 38.0374491,40.1857643 37.983795,40.286634 C37.9021601,40.4401076 37.8592307,40.6444514 37.8592307,40.9015385 L37.8592307,45.3815385 C37.8592307,45.5903767 37.9024633,45.7569021 37.9856792,45.8863491 C38.0451205,45.9788133 38.1633374,46.03 38.3723076,46.03 C38.4284473,46.03 38.4923801,46.0195923 38.5641326,45.9977546 C38.6276542,45.9784219 38.68768,45.9463151 38.7354475,45.9085323 C38.7799842,45.8689441 38.8208526,45.8090037 38.8563675,45.7261356 C38.8910165,45.645288 38.91,45.5345512 38.91,45.3938462 L38.91,44.7130769 L40.6653846,44.7130769 L40.6653846,45.5046154 Z M46.6592307,45.9561538 L46.6592307,47.7115385 L42.4176923,47.7115385 L42.4176923,38.4484615 L44.1730769,38.4484615 L44.1730769,45.9561538 L46.6592307,45.9561538 Z M48.2392308,38.4484615 L49.9946154,38.4484615 L49.9946154,47.7115385 L48.2392308,47.7115385 L48.2392308,38.4484615 Z M56.4315385,45.5046154 C56.4315385,45.8086463 56.3736204,46.0982366 56.2578802,46.3713834 C56.1435212,46.6412707 55.9852182,46.8821667 55.7837374,47.0928057 C55.5812512,47.3044957 55.3439366,47.4726896 55.0732618,47.5965577 C54.7981574,47.722453 54.5021456,47.7853846 54.1876923,47.7853846 C53.9276067,47.7853846 53.663941,47.7496333 53.3971228,47.6784818 C53.115817,47.6034669 52.8616588,47.4716812 52.636877,47.284363 C52.4121901,47.0971239 52.2286626,46.8578413 52.0864549,46.5688385 C51.9407194,46.2726664 51.87,45.9053818 51.87,45.4676923 L51.87,40.6430769 C51.87,40.3247168 51.9250473,40.0265438 52.0355731,39.7502293 C52.1464891,39.4729394 52.3046856,39.2309918 52.5093772,39.0263002 C52.7136863,38.821991 52.9570169,38.6620881 53.2375018,38.5471353 C53.5187884,38.4318539 53.8278763,38.3746154 54.1630769,38.3746154 C54.8201929,38.3746154 55.3658499,38.5938109 55.7837374,39.0302713 C55.9868908,39.2426589 56.1458026,39.4936935 56.260065,39.7816348 C56.3745492,40.070135 56.4315385,40.3824362 56.4315385,40.7169231 L56.4315385,41.4592308 L54.6761539,41.4592308 L54.6761539,40.7907692 C54.6761539,40.5988424 54.624039,40.4394321 54.5191018,40.3036311 C54.4275514,40.1851541 54.3122292,40.13 54.1507692,40.13 C53.9234369,40.13 53.803603,40.1857643 53.7499489,40.286634 C53.668314,40.4401076 53.6253846,40.6444514 53.6253846,40.9015385 L53.6253846,45.3815385 C53.6253846,45.5903767 53.6686172,45.7569021 53.7518331,45.8863491 C53.8112744,45.9788133 53.9294913,46.03 54.1384615,46.03 C54.1946012,46.03 54.258534,46.0195923 54.3302865,45.9977546 C54.3938081,45.9784219 54.4538339,45.9463151 54.5016014,45.9085323 C54.5461381,45.8689441 54.5870065,45.8090037 54.6225214,45.7261356 C54.6571704,45.645288 54.6761539,45.5345512 54.6761539,45.3938462 L54.6761539,44.7130769 L56.4315385,44.7130769 L56.4315385,45.5046154 Z M59.9392308,47.7115385 L58.1838462,47.7115385 L58.1838462,38.4484615 L59.9392308,38.4484615 L59.9392308,41.6069722 L61.3872865,38.4484615 L63.2031558,38.4484615 L61.3648029,42.2177463 L63.4876968,47.7115385 L61.6193062,47.7115385 L60.3237941,44.1823847 L59.9392308,44.9025669 L59.9392308,47.7115385 Z"
        />
        <g className="text-copy">
          <rect
            width="25.846"
            height="4.308"
            x="26.385"
            y="18.462"
            fill="#737794"
            fillRule="nonzero"
            opacity=".2"
            rx="2.154"
          />
          <rect
            width="47.385"
            height="2.154"
            x="26.385"
            y="27.077"
            fill="#737794"
            fillRule="nonzero"
            opacity=".1"
            rx="1.077"
          />
          <rect
            width="17.231"
            height="2.154"
            x="26.385"
            y="56.923"
            fill="#737794"
            fillRule="nonzero"
            opacity=".1"
            rx="1.077"
          />
        </g>
        <path
          className="cursor"
          fill="#2E2E2E"
          stroke="#EAEBEE"
          strokeWidth="2.154"
          d="M73.3339536,52.7745654 L72.2959296,55.3695683 C72.0489805,55.982934 71.4537922,56.3846357 70.7934735,56.3846357 C70.767838,56.3844334 70.767838,56.3844334 70.7528443,56.3840011 C70.7474956,56.383832 70.7474956,56.383832 70.7449965,56.3837465 C70.74609,56.383827 70.74609,56.383827 70.7209873,56.3830191 C70.0329402,56.352258 69.4398973,55.8899508 69.2427872,55.2307314 L65.9906732,44.3898504 C65.8207402,43.8201444 65.9764789,43.2025472 66.3986377,42.7803719 C66.8195543,42.3610488 67.4348876,42.2056409 68.0068432,42.3757802 L78.8477047,45.6281899 C79.5059498,45.8271281 79.9688032,46.4202007 79.9979681,47.1088482 C80.027057,47.7956994 79.6206152,48.4266851 78.9817153,48.6816108 L76.3894363,49.7187751 L79.5252805,52.8547629 C80.1570155,53.4865268 80.1570155,54.5106808 79.5252805,55.1440634 L78.7599538,55.9094239 C78.1279695,56.5430577 77.1022735,56.5430577 76.4696443,55.9103996 L73.3339536,52.7745654 Z"
        />
        <path
          fill="#B4BDDC"
          d="M97.4615385,108.307692 C97.2806154,108.307692 97.0975385,108.284 96.9187692,108.238769 L47.3803077,95.3156923 L47.9230769,80.3076923 L99.6153846,54.4615385 L99.6153846,106.153846 C99.6153846,106.821538 99.3052308,107.450462 98.7775385,107.859692 C98.3984615,108.152615 97.9332308,108.307692 97.4615385,108.307692 Z"
        />
        <path
          fill="#CFD6E9"
          d="M97.4615385,108.307692 L2.69230769,108.307692 C1.50123077,108.307692 0.538461538,107.342769 0.538461538,106.153846 L0.538461538,54.4615385 L98.4932308,104.262769 C99.3569231,104.734462 99.7941538,105.731692 99.5486154,106.685846 C99.3052308,107.64 98.4458462,108.307692 97.4615385,108.307692 Z"
        />
      </g>
    </svg>
  </div>
)

// ThankYouIllustration
const SlopeRollOut = keyframes`
from, 0% {
//transform: translate(0, 115px) rotate(90deg);
transform: translate(0, 115px);
}
to, 100% {
  //transform: translate(0, 0) rotate(0);
  transform: translate(0, 0);
}
`
const SheetGrow = keyframes`
from, 0% {
transform: scale(0, 1) rotate(-20deg) skew(30deg);
}
to, 100% {
  transform: scale(1, 1) rotate(0) skew(0);
}
`
const TextFadeIn = keyframes`
from, 0% {
    opacity: 0;
    //transform: rotate(-20deg);
}
5% {
  opacity: 0;
    //transform: rotate(-20deg);
}
to, 100% {
    opacity: 1;
    //transform: rotate(0);
}
`
const GrassGrow = keyframes`
from, 0% {

transform: translate(-35px, 20px);
}
40% {
  transform: translate(-35px, 20px);
}
to, 100% {

  transform: translate(-35px, 0);
}
`
const SlopeGrow = keyframes`
from, 0% {
transform: translate(0, 80px);
}
to, 100% {
  transform: translate(0, 0);
}
`
// SVG
export const ThankYouIllustration = (
  <div
    css={css`
      .sign {
        transform-origin: bottom center;
        animation: ${SlopeRollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .sheet {
        transform-origin: center center;
        animation: ${SheetGrow} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      text {
        transform-origin: center center;
        animation: ${TextFadeIn} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .grass {
        animation: ${GrassGrow} 2.2s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .slope {
        animation: ${SlopeGrow} 2.1s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200"
      height="100"
      viewBox="0 0 100 100"
    >
      <defs>
        <rect id="welcome-a" width="200" height="100" />
        <radialGradient
          id="welcome-c"
          r="60%"
          fx="50%"
          fy="50%"
          gradientTransform="matrix(.52439 0 0 .30542 .238 .347)"
        >
          <stop offset="0%" stopOpacity=".136" />
          <stop offset="100%" stopColor="#F0F0F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="welcome-b" fill="#fff">
          <use xlinkHref="#welcome-a" />
        </mask>
        <g mask="url(#welcome-b)" className="sign">
          <rect
            width="13"
            height="100"
            x="44"
            fill="#B4BDDC"
            rx="1"
            className="slope"
          />
          <ellipse
            cx="50"
            cy="100"
            fill="url(#welcome-c)"
            fillRule="nonzero"
            rx="82"
            ry="43"
          />
          <path
            className="grass"
            fill={theme.colors.green}
            css={css`
              transform: translate(-35px, 0);
            `}
            d="M112.181818,95.2 L112.181818,96.9 C112.181818,92.2055796 108.518693,88.4 104,88.4 L104,93.5 C104,98.1944204 107.663125,102 112.181818,102 C114.785762,102 117.283055,100.92536 119.124321,99.0124892 C120.965587,97.0996181 122,94.5052082 122,91.8 L122,85 C116.577568,85 112.181818,89.5666956 112.181818,95.2 Z"
          />
          <rect
            className="sheet"
            width="100"
            height="48"
            y="9"
            fill={theme.brand.primary}
            rx="5"
          />
          <rect
            className="sheet"
            width="94"
            height="42"
            x="3"
            y="12"
            stroke="#FFF"
            opacity="0.5"
            rx="3"
          />
          <text
            fill="#FFF"
            fontFamily={fonts.regular}
            fontSize="14.3"
            fontWeight="500"
          >
            <tspan x="13.713" y="39">
              WELCOME
            </tspan>
          </text>
          <rect width="13" height="4" x="44" y="57" fill="#7C87AA" />
        </g>
      </g>
    </svg>
  </div>
)

// UnsubscribeIllustration
const MailSlide = keyframes`
from, 0% {
    opacity: 0;
    transform: translate(18px, 20px);
}
20% {
    opacity: 1;
    
}
to, 100% {
    opacity: 1;
    transform: translate(18px, 75px);
}
`
const PiecesSlide = keyframes`
from, 0% {
    transform: scale(1, 0);
    opacity: 0;
}
20% {
    transform: scale(1, 0);
    opacity: 1;
}
85% {
    opacity: 1;
    transform: scale(1, 1);    
}
to, 100% {
    transform: scale(1,1) translate(0, 50px);
    opacity: 1;
}
`
const LightBlink = keyframes`
from, 20% {
opacity: 0.4;
}
80% {
    fill: white;
    opacity: 1;
}
to, 100% {
    opacity: 0.4;
}
`
const ShadowOpacity = keyframes`
from, 0% {
    opacity: 0;
}
80% {
    opacity: 1;
}
to, 100% {
    opacity: 0;
}
`
const LoadShredder = keyframes`
from, 0% {
    transform: scale(0, 1) translate(0, 67px);
}
to, 100% {
    transform: scale(1, 1) translate(0, 67px);
}
`
// SVG
export const UnsubscribeIllustration = (
  <div
    css={css`
      .pieces {
        rect {
          animation: ${PiecesSlide} 4s linear infinite;
          transform: scale(1, 1);
          opacity: 0;
          height: 80;
        }
        rect:nth-of-type(1) {
          transform: translate(0, -10px);
        }
      }
      .shredder {
        animation: ${LoadShredder} 500ms cubic-bezier(0.19, 1, 0.22, 1) 1;
        transform-origin: center center;
        transform: translate(0, 67px);
      }
      .mail {
        animation: ${MailSlide} 4s linear infinite;
        transform: translate(18px, 75px);
        transform-origin: center center;
      }
      .light {
        animation: ${LightBlink} 4s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      .shadow {
        animation: ${ShadowOpacity} 4s linear infinite;
      }
      svg {
        transform: scale(1.5);
        margin-bottom: 2rem;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="85"
      height="110"
      viewBox="0 0 85 50"
    >
      <defs>
        <rect id="unsubscribe-a" width="85" height="70" />
        <radialGradient
          className="shadow"
          id="welcome-c"
          r="80%"
          fx="50%"
          fy="50%"
          gradientTransform="matrix(.52439 0 0 .30542 .238 .347)"
        >
          <stop offset="0%" stopOpacity=".13" />
          <stop offset="100%" stopColor="#F0F0F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(0 -17)">
        <mask id="unsubscribe-b" fill="#fff">
          <use xlinkHref="#unsubscribe-a" />
        </mask>
        <g mask="url(#unsubscribe-b)">
          <g className="mail" transform="translate(18 17)">
            <path
              fill="#B4BDDC"
              d="M47.9347826,37 L1.06521739,37 C0.47691913,37 0,36.5127753 0,35.9117647 L0,1.08823529 C0,0.487224706 0.47691913,0 1.06521739,0 L47.9347826,0 C48.5230809,0 49,0.487224706 49,1.08823529 L49,35.9117647 C49,36.5127753 48.5230809,37 47.9347826,37 Z"
            />
            <path
              fill="#9DA6C5"
              d="M24.5000034,13 C24.7569448,13 25.0133642,13.0948109 25.2167358,13.2833855 L48.6515475,35.1015673 C48.9771422,35.4051891 49.0868917,35.8824618 48.9282593,36.3022109 C48.7696163,36.7230073 48.3748463,37 47.9348151,37 L1.06519171,37 C0.625160512,37 0.230390457,36.7230073 0.0717474343,36.3022 C-0.0868955885,35.8824509 0.0228538954,35.4051782 0.348459299,35.1015564 L23.783271,13.2833745 C23.9866425,13.0948109 24.243062,13 24.5000034,13 Z"
            />
            <path
              fill="#CFD6E9"
              d="M24.4999976,24 C24.2430563,24 23.9866368,23.9051891 23.7832653,23.7166145 L0.348454577,1.89843273 C0.0228491872,1.59481091 -0.0868896399,1.11753818 0.0717427241,0.6978 C0.23038574,0.276992727 0.625155778,0 1.06518696,0 L47.9348083,0 C48.3748395,0 48.7696096,0.276992727 48.9282526,0.6978 C49.0868956,1.11754909 48.9771461,1.59482182 48.6515407,1.89844364 L25.21673,23.7166255 C25.0133585,23.9051891 24.756939,24 24.4999976,24 Z"
            />
          </g>
        </g>
        <ellipse
          className="shadow"
          cx="40"
          cy="100"
          fill="url(#welcome-c)"
          fillRule="nonzero"
          rx="60"
          ry="60"
        />
        <g
          className="pieces"
          fill="#CFD6E9"
          fillRule="nonzero"
          transform="translate(18 77)"
        >
          <rect width="2.816" height="30" />
          <rect width="2.816" height="30" x="20.184" />
          <rect width="2.816" height="30" x="9.857" />
          <rect width="2.816" height="24" x="4.694" />
          <rect width="2.816" height="24" x="15.02" />
          <g transform="translate(26)">
            <rect width="2.816" height="30" />
            <rect width="2.816" height="30" x="20.184" />
            <rect width="2.816" height="30" x="9.857" />
            <rect width="2.816" height="24" x="4.694" />
            <rect width="2.816" height="24" x="15.02" />
          </g>
        </g>

        <g className="shredder" fillRule="nonzero" transform="translate(0 64)">
          <rect width="85" height="13" fill="#737794" rx="5" />
          <circle className="light" cx="7" cy="6" r="3" fill="#CFD6E9" />
        </g>
      </g>
    </svg>
  </div>
)
