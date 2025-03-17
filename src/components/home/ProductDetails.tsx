'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'howToTake', label: 'How to take' },
    { id: 'ingredients', label: 'Ingredients' },
  ];

  const productImages = [
    '/images/swiper-sample.png',
    '/images/swiper-sample.png',
    '/images/swiper-sample.png',
    '/images/swiper-sample.png',
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      <div className="flex md:flex-row flex-col space-x-8">
        <div className="md:w-1/2 w-full">
          <div className="flex space-x-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-red-600">
                Iron, Folic acid and Vitamin B 12 Formula encapsulated in vanilla flavored capsule
              </h2>
              <p className="text-gray-700">
                FERROVIT contains ferrous fumarate which is a form of an iron & is used in treatment of iron deficiency
                anaemia. Among all iron salts, ferrous fumarate provides the maximum amount of usable iron.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Increases lowered iron levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Beneficial in iron deficiency anaemia & pregnancy induced anaemia</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Vitamin B12 and folic acid help in blood formation (haematopoiesis)</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'howToTake' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dosage Instructions</h3>
              <p className="text-gray-700">
                Take one capsule daily or as directed by your healthcare professional.
                Best taken with meals to maximize absorption.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Active Ingredients</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ferrous Fumarate</li>
                <li>Folic Acid</li>
                <li>Vitamin B12</li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="md:w-1/2 w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[500px]">
                  <Image
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 