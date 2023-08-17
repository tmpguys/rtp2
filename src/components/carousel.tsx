
import Slider from "react-slick";
import './cstcss/slick.css'
import './cstcss/slick2.css'
import { PropsWithChildren } from "react";
type Props = PropsWithChildren ;

export default function Carousel({ children }: Props) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}
