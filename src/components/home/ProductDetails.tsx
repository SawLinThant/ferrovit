<<<<<<< HEAD
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
=======
"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BulletIcon from "../common/icons/bullet";
import IndicationIcon from "../common/icons/indication";
import HowToUseIcon from "../common/icons/howtouse";
import CapsuleIcon from "../common/icons/capsule";
import BottleIcon from "../common/icons/bottle";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Details" },
    { id: "howToTake", label: "How to take" },
    { id: "ingredients", label: "Ingredients" },
  ];

  const productImages = [
    "/images/swiper-sample.png",
    "/images/swiper-sample.png",
    "/images/swiper-sample.png",
    "/images/swiper-sample.png",
>>>>>>> upstream/main
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
<<<<<<< HEAD
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600'
=======
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-600"
>>>>>>> upstream/main
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

<<<<<<< HEAD
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
=======
          {activeTab === "details" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-red-600">
                Iron, Folic acid and Vitamin B 12 Formula encapsulated in
                vanilla flavored capsule
              </h2>
              <p className="text-gray-700">
                FERROVIT contains ferrous fumarate which is a form of an iron &
                is used in treatment of iron deficiency anaemia. Among all iron
                salts, ferrous fumarate provides the maximum amount of usable
                iron.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-4">
                  <BulletIcon height="22" width="22" color="#F12E2A" />
                  <span>Increases lowered iron levels</span>
                </li>
                <li className="flex items-center space-x-4">
                  <BulletIcon height="22" width="22" color="#F12E2A" />
                  <span>
                    Beneficial in iron deficiency anaemia & pregnancy induced
                    anaemia
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <BulletIcon height="22" width="22" color="#F12E2A" />
                  <span>
                    Vitamin B12 and folic acid help in blood formation
                    (haematopoiesis)
                  </span>
>>>>>>> upstream/main
                </li>
              </ul>
            </div>
          )}

<<<<<<< HEAD
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
=======
          {activeTab === "howToTake" && (
            <div className="space-y-4 mt-14">
              <ul className="space-y-2">
                <li className="flex items-center space-x-4">
                  <IndicationIcon height="22" width="22" color="#F12E2A" />
                  <span className="text-muted-foreground">
                    Indication/When to use:{" "}
                    <span className="text-black ml-3">Iron deficiency</span>
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <HowToUseIcon height="22" width="22" color="#F12E2A" />
                  <span className="text-muted-foreground">
                    How to use:{" "}
                    <span className="text-black ml-3">
                      One capsule twice daily after meals or as directed by
                      physician.
                    </span>
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <CapsuleIcon height="101" width="83" color="#F12E2A" />
                </li>
              </ul>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-4 mt-14">
              <span className="text-lg text-muted-foreground">
                Each softgel capsule contains:
              </span>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center space-x-4">
                  <BottleIcon height="41" width="40" color="#F12E2A" />
                  <span>
                    Ferrous Fumarate 162.00 mg equivalent to Iron 53.25 mg
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <BottleIcon height="41" width="40" color="#F12E2A" />
                  <span>Folic Acid 0.75 mg</span>
                </li>
                <li className="flex items-center space-x-4">
                  <BottleIcon height="41" width="40" color="#F12E2A" />
                  <span>Vitamin B12 7.50 mcg</span>
                </li>
>>>>>>> upstream/main
              </ul>
            </div>
          )}
        </div>
<<<<<<< HEAD
        
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
=======

        <div className="md:w-1/2 w-full">
          {activeTab === "details" && (
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
                  <div className="relative w-full h-[400px]">
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
          )}
          {activeTab === "howToTake" && (
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/howtotake.png"
                alt="How to take"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
          {activeTab === "ingredients" && (
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/ingredients.png"
                alt="Ingredients"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
>>>>>>> upstream/main
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ProductDetails; 
=======
export default ProductDetails;
>>>>>>> upstream/main
