import React, { ForwardedRef } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

function SlackIcon(props: SvgIconProps, ref: ForwardedRef<SVGSVGElement>) {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="20"
      viewBox="60 60 150 150"
      fill="none"
      ref={ref}
    >
      <g>
        <g>
          <path d="M99.4,151.2c0,7.1-5.8,12.9-12.9,12.9s-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h12.9V151.2z" />
          <path
            d="M105.9,151.2c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v32.3c0,7.1-5.8,12.9-12.9,12.9s-12.9-5.8-12.9-12.9
			C105.9,183.5,105.9,151.2,105.9,151.2z"
          />
        </g>
        <g>
          <path d="M118.8,99.4c-7.1,0-12.9-5.8-12.9-12.9s5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v12.9H118.8z" />
          <path
            d="M118.8,105.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9H86.5c-7.1,0-12.9-5.8-12.9-12.9s5.8-12.9,12.9-12.9
			C86.5,105.9,118.8,105.9,118.8,105.9z"
          />
        </g>
        <g>
          <path d="M170.6,118.8c0-7.1,5.8-12.9,12.9-12.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9h-12.9V118.8z" />
          <path
            d="M164.1,118.8c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9V86.5c0-7.1,5.8-12.9,12.9-12.9
			c7.1,0,12.9,5.8,12.9,12.9V118.8z"
          />
        </g>
        <g>
          <path d="M151.2,170.6c7.1,0,12.9,5.8,12.9,12.9c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9v-12.9H151.2z" />
          <path
            d="M151.2,164.1c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h32.3c7.1,0,12.9,5.8,12.9,12.9
			c0,7.1-5.8,12.9-12.9,12.9H151.2z"
          />
        </g>
      </g>
    </SvgIcon>
  );
}
export default React.memo(React.forwardRef<SVGSVGElement>(SlackIcon));
