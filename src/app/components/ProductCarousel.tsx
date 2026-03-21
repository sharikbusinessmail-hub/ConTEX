import React from 'react';
import Slider from 'react-slick';
import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all"
      aria-label="Next"
    >
      <ChevronRight className="h-5 w-5 text-gray-800" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all"
      aria-label="Previous"
    >
      <ChevronLeft className="h-5 w-5 text-gray-800" />
    </button>
  );
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <Card
                className="group cursor-pointer overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300"
                onClick={() => onProductClick(product)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-base font-bold mt-1">${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};