import React from 'react';

interface BannerOfertaProps {
  bannerUrl: string;
  bannerUrl1: string;
  bannerUrl2: string;
  bannerUrl3: string;
  linkOfertaUrl: string;
}

export function CreateBannerOferta(props: BannerOfertaProps) {
  return (
    <>
      <h1 className="text-4xl text-[#2E2F7B] mt-10 sm:mt-20">OFERTAS <span className="font-black">VERGINIA</span></h1>
      <div className="container mx-auto flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 my-8 sm:my-16">
          <a className="relative rounded-3xl overflow-hidden" target="_blank" href={props.linkOfertaUrl} rel="noreferrer">
            <img className="w-72" src={props.bannerUrl} alt="" />
          </a>
          <a className="relative rounded-3xl overflow-hidden" target="_blank" href={props.linkOfertaUrl} rel="noreferrer">
            <img className="w-72" src={props.bannerUrl1} alt="" />
          </a>
          <a className="relative rounded-3xl overflow-hidden" target="_blank" href={props.linkOfertaUrl} rel="noreferrer">
            <img className="w-72" src={props.bannerUrl2} alt="" />
          </a>
          <a className="relative rounded-3xl overflow-hidden" target="_blank" href={props.linkOfertaUrl} rel="noreferrer">
            <img className="w-72" src={props.bannerUrl3} alt="" />
          </a>
        </div>
      </div>
    </>
  );
}