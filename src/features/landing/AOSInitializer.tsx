'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export const AOSInitializer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  return null;
};
