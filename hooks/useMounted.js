// Marcar este hook como um Client Component
"use client";

import { useState, useEffect } from 'react';

const useMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useMounted;
