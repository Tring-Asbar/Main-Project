import './Advertisement.scss';
import ad1 from '../../../assets/Images/Advertisements/Advertisement1.svg';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Add this

interface Advertisement {
  Image?: string;
  Screen?: string;
  
}

const Advertisement = () => {
  const location = useLocation();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [index, setIndex] = useState(localStorage.getItem('index') || '0');
  const [loading, setLoading] = useState(false); // <-- Loading state

  const tab = (() => {
    switch (index) {
      case '0': return 'teachers';
      case '1': return 'students';
      case '2': return 'classroom';
      default: return 'announcement';
    }
  })();

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = localStorage.getItem('index');
      if (newIndex !== index) {
        setIndex(newIndex || '0');
      }
    }, 500);
    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true); 
        const response: AxiosResponse<Advertisement[]> = await axios.get(
          `${import.meta.env.VITE_KATON_CMS_SITE}/class_room_advertisement`,
          {
            headers: {
              'X-Hash-Key': import.meta.env.VITE_KATON_SITE_API_KEY || '',
            },
          }
        );
        setAds(response.data);
      } catch (error) {
        console.error('Failed to fetch advertisements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [index]);

  const routeBasedAd = ads.find((ad) =>
    location.pathname.toLowerCase().includes(ad.Screen?.toLowerCase() || '')
  );

  const tabBasedAd = ads.find((ad) =>
    tab === ad.Screen?.toLowerCase()
  );

  const finalAd = routeBasedAd || tabBasedAd;

  const imageUrl = finalAd?.Image
    ? `${import.meta.env.VITE_KATON_FRONT_END_URL}/${finalAd.Image}`
    : null;

  return (
    <div className="advertisement-content">
      <div className="img1">
        <img src={ad1} alt="Default Ad" />
      </div>
      <div className="img2">
        {loading ? (
          
          <div className="loader-container">
            <CircularProgress size={20} />
          </div>
        ) : (
          imageUrl && <img key={imageUrl} src={imageUrl} alt="Advertisement" />
        )}
      </div>
    </div>
  );
};

export default Advertisement;
