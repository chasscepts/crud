import PropTypes from 'prop-types';

const Logo = ({ width }) => (
  <svg style={{ width: `${width}px`, height: `${width / 2}px` }} viewBox="0, 0, 446, 231">
    <path d="M 13.009,0 433.107,0 C440.228,0 446,5.772 446,12.893 l0,205.214 C446,225.228 440.228,231 433.107,231 L13.009,231 C5.889,231 0.116,225.228 0.116,218.107 l0,-205.214 C0.116,5.772 5.889,0 13.009,0 z" fill="#27415E" />
    <path d="m64.431,149.881 0,-36.665 c0.243,-8.863 5.221,-13.962 10.927,-13.962 8.985,0 10.806,7.406 10.927,13.962 l0,36.665 18.212,0 0,-39.7 c0,-2.064 -0.243,-5.949 -1.215,-9.713 C101.097,91.605 89.32,87.113 83.25,87.113 c-9.227,0 -14.933,3.642 -18.697,9.227 l-0.243,-0.243 0,-33.873 -18.09,0 0,87.657 z" fill="#FFF" />
    <path d="m112.51,88.934 0,12.141 12.262,0 0,29.988 c0,13.234 3.035,20.64 17.24,20.64 2.55,0 12.262,-0.85 14.326,-1.822 l0,-10.684 c-1.942,0.122 -3.885,0.365 -5.827,0.365 -6.314,0 -7.528,-2.186 -7.528,-10.199 l0,-28.288 13.72,0 0,-12.141 -13.72,0 0,-18.576 -18.211,6.556 0,12.02 z" fill="#FFF" />
    <path d="m112.51,88.934 0,12.141 12.262,0 0,29.988 c0,13.234 3.035,20.64 17.24,20.64 2.55,0 12.262,-0.85 14.326,-1.822 l0,-10.684 c-1.942,0.122 -3.885,0.365 -5.827,0.365 -6.314,0 -7.528,-2.186 -7.528,-10.199 l0,-28.288 13.72,0 0,-12.141 -13.72,0 0,-18.576 -18.211,6.556 0,12.02 z" fill="#FFF" style={{ transform: 'translateX(47.228px)' }} />
    <path d="m230.762,88.934 -18.454,0 c0.243,4.006 0.607,8.134 0.607,12.141 l0,72.117 18.211,0 0,-31.931 0.243,0 c3.885,7.163 10.684,10.442 18.576,10.442 17.847,0 26.224,-16.634 26.224,-32.295 0,-16.391 -9.591,-32.295 -28.531,-32.295 -6.313,0 -12.869,3.763 -16.269,8.863 l-0.243,0 z m0.364,30.474 c0,-8.378 3.279,-20.154 13.113,-20.154 11.655,0 13.112,10.805 13.112,20.154 0,9.348 -1.457,20.154 -13.112,20.154 -9.834,0 -13.113,-11.777 -13.113,-20.154 z" fill="#FFF" />
    <path d="m305.672,149.881 0,-16.147 -15.419,0 0,16.147 z m0,-44.921 0,-16.147 -15.419,0 0,16.147 z" fill="#FFF" />
    <path d="m363.584,62.224 -14.083,0 -29.624,99.313 14.205,0 z" fill="#FFF" />
    <path d="m363.584,62.224 -14.083,0 -29.624,99.313 14.205,0 z" fill="#FFF" style={{ transform: 'translateX(43.472px)' }} />
  </svg>
);

//  <use transform="translate(47.228,0)" xlink:href="#t" />
//  <use transform="translate(43.472,0)" xlink:href="#slash" />

Logo.propTypes = {
  width: PropTypes.number,
};

Logo.defaultProps = {
  width: 60,
};

export default Logo;