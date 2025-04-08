import './Advertisement.scss'
import ad1 from '../../../assets/Images/Advertisements/Advertisement1.svg'
import ad2 from '../../../assets/Images/Advertisements/Advertisement2.svg'
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
interface Advertisement {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    ad_image?: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

const Advertisement = () => {
  // return (
  //   <div className="advertisement-content">
  //     <div className='img1'>
  //       <img src={ad1}  alt="Image" />
  //     </div>
  //     <div className='img2'>
  //       <img src={ad2}  alt="Image" />
  //     </div>
  //   </div>
  // )

  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response: AxiosResponse<Advertisement[]> = await axios.get(
          `${import.meta.env.VITE_KATON_CMS_SITE}/class_room_advertisement`,
          {
            headers: {
              "X-Hash-Key": import.meta.env.VITE_KATON_SITE_API_KEY || "",
            },
          }
        );
        setAds(response.data);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      }
    };

    fetchAds();
  }, []);

  const extractImageUrl = (ad: Advertisement): string | null => {
    const fromContent = ad.content?.rendered?.match(/<img.*?src="(.*?)"/);
    return (
      ad._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      ad.acf?.ad_image ||
      (fromContent ? fromContent[1] : null)
    );
  };

  return (
    <div className="advertisement-content">
      
      {ads.map((ad) => {
        {console.log("Ad data:", ad)}
        const imageUrl = extractImageUrl(ad);
        {console.log(imageUrl)}
        return (
          <div key={ad.id} className="img-wrapper">
            {imageUrl && <img src={imageUrl} alt="Advertisement" />}
          </div>
        );
      })}
    </div>
  );
};



export default Advertisement
